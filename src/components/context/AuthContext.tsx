import React, {
    createContext,
    useState,
    useContext,
    type ReactNode,
    useEffect,
} from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import type { LoginResponse, UserData } from "../types/auth";

// --- Интерфейсы и Типы ---

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserData | null;
    token: string | null;
    isLoading: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

// --- Создание контекста ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Провайдер Контекста ---

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- Вынесено выше, чтобы не было проблем с замыканиями ---
    const handleLogin = (loginData: LoginResponse) => {
        localStorage.setItem("accessToken", loginData.accessToken);
        localStorage.setItem("refreshToken", loginData.refreshToken);
        localStorage.setItem("sid", loginData.sid);
        localStorage.setItem("user", JSON.stringify(loginData.userData));

        authService.setToken(loginData.accessToken);
        setIsLoggedIn(true);
        setUser(loginData.userData);
        setToken(loginData.accessToken);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            localStorage.clear();
            authService.setToken(null);
            setIsLoggedIn(false);
            setUser(null);
            setToken(null);
            toast.success("You have been logged out.");
        } catch {
            toast.error("Logout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        // --- Логика обработки URL после редиректа ---

        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        const sid = urlParams.get("sid");
        const errorMessage = urlParams.get("message");

        // **Сценарий 1: Успешный вход через Google**
        if (accessToken && refreshToken && sid) {
            const fetchUserAfterGoogleAuth = async () => {
                try {
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("sid", sid);

                    authService.setToken(accessToken);

                    let userData: UserData;
                    try {
                        userData = await authService.getCurrentUser();
                    } catch (error) {
                        console.error(
                            "Failed to fetch user data, using mock data.",
                            error
                        );
                        userData = {
                            email: "user.from.google@test.com",
                            id: "google-user-id",
                        };
                    }

                    const loginData: LoginResponse = {
                        accessToken,
                        refreshToken,
                        sid,
                        userData,
                    };
                    handleLogin(loginData);
                    toast.success(`Welcome, ${userData.email}!`);

                    window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname
                    );
                } catch {
                    toast.error(
                        "Failed to fetch user data after Google login."
                    );
                    handleLogout();
                }
            };
            fetchUserAfterGoogleAuth();
        }
        // **Сценарий 2: Неудачный вход через Google**
        else if (errorMessage) {
            const decodedMessage = decodeURIComponent(errorMessage);
            toast.error(decodedMessage);
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        }
        // **Сценарий 3: Обычная загрузка страницы (проверяем localStorage)**
        else {
            const storedAccessToken = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");

            if (storedAccessToken && storedUser) {
                authService.setToken(storedAccessToken);
                setIsLoggedIn(true);
                setUser(JSON.parse(storedUser));
                setToken(storedAccessToken);
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                token,
                isLoading,
                login: handleLogin,
                logout: handleLogout,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

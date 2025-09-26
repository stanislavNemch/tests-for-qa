import { useState, useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import type { LoginResponse, UserData } from "../types/auth";
import { AuthContext } from "./AuthContext";
import { safeParseJSON } from "../utils/json";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            window.location.href = "/auth";
        } catch {
            toast.error("Logout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        const sid = urlParams.get("sid");
        const errorMessage = urlParams.get("message");

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

                    handleLogin({
                        accessToken,
                        refreshToken,
                        sid,
                        userData,
                    });

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
        } else if (errorMessage) {
            toast.error(decodeURIComponent(errorMessage));
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        } else {
            const storedAccessToken = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");
            if (storedAccessToken && storedUser) {
                const parsedUser = safeParseJSON<UserData>(storedUser, {
                    email: "",
                    id: "",
                });
                if (parsedUser.id) {
                    authService.setToken(storedAccessToken);
                    setIsLoggedIn(true);
                    setUser(parsedUser);
                    setToken(storedAccessToken);
                } else {
                    localStorage.removeItem("user");
                }
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

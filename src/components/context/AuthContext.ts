import { createContext } from "react";
import type { LoginResponse, UserData } from "../types/auth";

export interface AuthContextType {
    isLoggedIn: boolean;
    user: UserData | null;
    token: string | null;
    isLoading: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

// Отдельный чистый экспорт (это НЕ компонент)
export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

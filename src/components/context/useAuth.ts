import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

// Хук для использования контекста аутентификации

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}

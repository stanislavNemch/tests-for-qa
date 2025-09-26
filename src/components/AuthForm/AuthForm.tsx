import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { authService } from "../services/authService";
import toast from "react-hot-toast";
import css from "./AuthForm.module.css";
import axios from "axios";
import type { ApiErrorResponse } from "../types/auth";

interface AuthFormProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, setIsLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isLogin) {
                const { data } = await authService.login({ email, password });
                login(data);
                toast.success("Successfully logged in!");
            } else {
                await authService.register({
                    email,
                    password,
                });
                toast.success("Successfully registered! Please log in.");
                setIsLogin(true);
            }
        } catch (error: unknown) {
            let errorMessage = "An error occurred. Please try again.";

            if (
                axios.isAxiosError<ApiErrorResponse>(error) &&
                typeof error.response?.data?.message === "string"
            ) {
                errorMessage = error.response.data.message;
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={css.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={css.input}
            />
            <div className={css.buttons}>
                <button type="submit" className={css.mainButton}>
                    {isLogin ? "Sign In" : "Register"}
                </button>
                <button
                    type="button"
                    className={css.secondaryButton}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Sign Up" : "Back to Sign In"}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;

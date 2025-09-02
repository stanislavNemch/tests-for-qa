import { useState } from "react";
import toast from "react-hot-toast";
import css from "./AuthPage.module.css";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
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
                await authService.register({ email, password });
                toast.success("Successfully registered! Please log in.");
                setIsLogin(true);
            }
        } catch (error: unknown) {
            let errorMessage = "An error occurred. Please try again.";
            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error as any).response?.data?.message === "string"
            ) {
                errorMessage = (error as any).response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href =
            "https://protest-backend.goit.global/auth/google";
    };

    return (
        <div className={css.authContainer}>
            <div className={css.authInfo}>
                <h1 className={css.title}>Pro Test</h1>
                <p className={css.description}>
                    <strong>[</strong> We will help you find weak points in
                    knowledge so that you can strengthen it. We will show you
                    what is relevant to know for a <strong>QA Engineer</strong>{" "}
                    and will try to make the learning process more diverse_{" "}
                    <strong>]</strong>
                </p>
            </div>
            <div className={css.formWrapper}>
                <p className={css.formTitle}>
                    You can use your Google Account to authorize:
                </p>
                <button className={css.googleButton} onClick={handleGoogleAuth}>
                    <FcGoogle size={24} /> Google
                </button>
                <p className={css.formTitle}>
                    Or login to our app using e-mail and password:
                </p>
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
            </div>
        </div>
    );
};

export default AuthPage;

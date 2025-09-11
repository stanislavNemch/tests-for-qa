import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import css from "./AuthPage.module.css";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../AuthForm/AuthForm";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        toast(
            "To use Google login, please register first with email and password. After registration, you can log in via Google.",
            {
                icon: "⚠️",
                style: { background: "#fff3cd", color: "#856404" },
            }
        );
    }, []);

    // --- Эмуляция Google авторизации ---
    const handleGoogleAuth = () => {
        // TODO: Реализовать реальную Google OAuth авторизацию
        // Сейчас просто эмулируем успешный вход
        toast.success("Google sign-in emulated! (future real OAuth here)");
        // Пример эмуляции входа:
        login({
            accessToken: "fake-google-access-token",
            refreshToken: "fake-google-refresh-token",
            sid: "fake-google-sid",
            userData: {
                email: "google.user@example.com",
                id: "google-user-id",
            },
        });
    };

    return (
        <section className="auth">
            <div className={css.container}>
                <div className={css.authInfo}>
                    <h1 className={css.title}>Pro Test</h1>
                    <p className={css.description}>
                        <strong>[</strong> We will help you find weak points in
                        knowledge so that you can strengthen it. We will show
                        you what is relevant to know for a{" "}
                        <strong>QA Engineer</strong> and will try to make the
                        learning process more diverse_ <strong>]</strong>
                    </p>
                </div>
                <div className={css.formWrapper}>
                    <p className={css.formTitle}>
                        You can use your Google Account to authorize:
                    </p>
                    <button
                        className={css.googleButton}
                        onClick={handleGoogleAuth}
                    >
                        <FcGoogle size={24} /> Google
                    </button>
                    <p className={css.formTitle}>
                        Or login to our app using e-mail and password:
                    </p>
                    <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
                </div>
            </div>
        </section>
    );
};

export default AuthPage;

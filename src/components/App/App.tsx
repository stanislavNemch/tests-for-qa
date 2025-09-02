import { useAuth } from "../context/AuthContext";
import css from "./App.module.css";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function AppContent() {
    const { isLoggedIn } = useAuth();

    return (
        // Используем css.appWrapper для правильного позиционирования футера
        <div className={css.appWrapper}>
            <Header />
            <main className={css.container}>
                {isLoggedIn ? <HomePage /> : <AuthPage />}
            </main>
            <Footer />
        </div>
    );
}

function App() {
    // AuthProvider остается в main.tsx, здесь он не нужен
    return <AppContent />;
}

export default App;

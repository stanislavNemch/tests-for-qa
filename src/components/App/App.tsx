import { AuthProvider, useAuth } from "../context/AuthContext";
import css from "./App.module.css";

function AppContent() {
    const { isLoggedIn } = useAuth();
    return (
        <div className={css.container}>
            {isLoggedIn ? (
                <>
                    <h1>Welcome back!</h1>
                </>
            ) : (
                <>
                    <h1>Please log in.</h1>
                </>
            )}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;

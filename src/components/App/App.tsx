import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import css from "./App.module.css";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import TestPage from "../TestPage/TestPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import UsefulInfoPage from "../UsefulInfoPage/UsefulInfoPage";
import ContactsPage from "../ContactsPage/ContactsPage";

function AppContent() {
    const { isLoading } = useAuth();

    return (
        <div className={css.appWrapper}>
            <Header />
            <main className={css.container}>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/test/:testType"
                        element={
                            <PrivateRoute>
                                <TestPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <PrivateRoute>
                                <ResultsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/useful-info"
                        element={
                            <PrivateRoute>
                                <UsefulInfoPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
            {isLoading && <Loader />}
        </div>
    );
}

function App() {
    return <AppContent />;
}

export default App;

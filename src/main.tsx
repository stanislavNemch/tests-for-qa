import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/context/AuthContext.tsx";
import App from "./components/App/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster position="top-center" />
            </AuthProvider>
        </BrowserRouter>
        <SpeedInsights />
    </React.StrictMode>
);

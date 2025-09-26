import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;

import { Navigate } from "react-router-dom";
import { isTokenExpired } from "@utils/jwt";
interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("auth_token");

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
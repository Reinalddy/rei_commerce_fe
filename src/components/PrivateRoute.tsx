import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("auth_token");

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
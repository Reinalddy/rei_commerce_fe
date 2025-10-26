import { Navigate } from "react-router-dom";

interface LoginRegisterRoute {
    children: React.ReactNode;
}


export default function LoginRegisterRoute({ children }: LoginRegisterRoute) {
    const token = localStorage.getItem("auth_token");

    if (token) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
}
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { LoadingScreen } from "./ui";

export default function PrivateRoute() {
  const { token, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingScreen message="Memeriksa sesi..." />
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
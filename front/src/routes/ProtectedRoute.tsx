import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore(); // Obtém o token do estado global
  return user.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

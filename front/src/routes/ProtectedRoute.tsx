import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const ProtectedRoute = () => {
  const { user } = useAuthStore(); // usuário logado do estado global
  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

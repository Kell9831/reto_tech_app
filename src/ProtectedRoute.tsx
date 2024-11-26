import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/contexts/authContext";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
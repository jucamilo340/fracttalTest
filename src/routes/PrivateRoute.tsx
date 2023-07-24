import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { useAuth } from "../context/authContext";

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div><Spinner/></div>;
  if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
  return <Outlet />;
};
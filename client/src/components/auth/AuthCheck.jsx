import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function AuthCheck({children }) {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth();
  
  // Redirect to login if not authenticated and trying to access protected routes
  if (!isAuthenticated && 
      !location.pathname.includes("/auth/login") && 
      !location.pathname.includes("/auth/register")) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect from auth pages if already authenticated
  if (isAuthenticated && 
      (location.pathname.includes("/auth/login") || 
       location.pathname.includes("/auth/register"))) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/notes"} replace />;
  }

  // Redirect unauthorized users trying to access admin area
  if (isAuthenticated && 
      user?.role !== "admin" && 
      location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Redirect admin users trying to access user notes
  if (isAuthenticated && 
      user?.role === "admin" && 
      location.pathname.includes("/notes")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default AuthCheck;

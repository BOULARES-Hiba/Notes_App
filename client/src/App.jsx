import { Routes, Route } from "react-router-dom";
import { Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Notes from "./pages/user/Notes";
import Dashboard from "./pages/admin/dashboard";
import Unauth from "./pages/Unauthorized/Unauth";
import Notfound from "./pages/notFound/notfound";
import AuthCheck from "./components/auth/AuthCheck";
import AuthLayout from "./components/auth/AuthLayout";
import { useAuth } from "./context/AuthContext";
import { Skeleton } from "./components/ui/skeleton";

function App() {
   const { isAuthenticated, user ,loading} = useAuth();
  if (loading) return(<Skeleton className="h-screen w-full bg-gray-400 rounded animate-pulse mb-2" />)
  return (
    <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/notes"} replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          } 
        />
        
      <Route element={<AuthLayout />}>
  <Route
    path="auth/login"
    element={
      <AuthCheck >
        <Login />
      </AuthCheck>
    }
  />
  <Route
    path="auth/register"
    element={
      <AuthCheck >
        <Register />
      </AuthCheck>
    }
  />
</Route>
      <Route
        path="notes"
        element={
          <AuthCheck >
            <Notes />
          </AuthCheck>
        }
      />
      <Route
        path="admin/dashboard"
        element={
          <AuthCheck>
            <Dashboard />
          </AuthCheck>
        }
      />

      <Route path="/unauth-page" element={
          isAuthenticated ? <Unauth /> : <Navigate to="/auth/login" replace />
        }  />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;

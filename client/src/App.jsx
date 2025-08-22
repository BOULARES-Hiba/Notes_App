import { Routes, Route } from "react-router-dom";
import { Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Notes from "./pages/user/Notes";
import Dashboard from "./pages/admin/dashboard";
import Unauth from "./pages/Unauthorized/Unauth";
import Notfound from "./pages/notFound/notfound";
import { useState } from "react";
import AuthCheck from "./components/auth/AuthCheck";
import AuthLayout from "./components/auth/AuthLayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    role: "admin",
  });

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
      <AuthCheck isAuthenticated={isAuthenticated} user={user}>
        <Login />
      </AuthCheck>
    }
  />
  <Route
    path="auth/register"
    element={
      <AuthCheck isAuthenticated={isAuthenticated} user={user}>
        <Register />
      </AuthCheck>
    }
  />
</Route>
      <Route
        path="notes"
        element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <Notes />
          </AuthCheck>
        }
      />
      <Route
        path="admin/dashboard"
        element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <Dashboard />
          </AuthCheck>
        }
      />

      <Route path="/unauth-page" element={<Unauth />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;

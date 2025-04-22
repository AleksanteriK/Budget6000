import { Routes, Route, Navigate } from 'react-router';
import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';
import './App.css';
import Navbar from './NavBar';
import { useAuth } from './AuthContext';
import { Login, Logout, Home, LoadingSpinner, Account, Signup, Analytics} from "./pages";

// Define types for the PrivateRoute props
interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return <LoadingSpinner message="Ladataan käyttäjätietoja..." />;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <div><Toaster /></div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Navbar />
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Navbar />
              <Analytics />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
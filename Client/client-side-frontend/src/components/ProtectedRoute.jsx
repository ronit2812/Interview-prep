import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

// Protected route component that checks for authentication
export default function ProtectedRoute({ children }) {
  const { userInfo, loading, verifyToken } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (userInfo) {
        const valid = await verifyToken();
        setIsTokenValid(valid);
      }
      setIsVerifying(false);
    };

    checkToken();
  }, [userInfo, verifyToken]);

  // Show nothing while checking authentication
  if (loading || isVerifying) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4946A6]"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token is invalid, will be handled by the verifyToken function (logout)

  // If authenticated, render children
  return children;
}

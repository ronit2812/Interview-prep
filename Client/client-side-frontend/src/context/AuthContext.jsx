import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on first render
  useEffect(() => {
    const checkLoggedIn = () => {
      const storedUserInfo = localStorage.getItem("userInfo");

      if (storedUserInfo) {
        try {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        } catch (error) {
          console.error("Error parsing user info:", error);
          localStorage.removeItem("userInfo");
        }
      }

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      // Store user info in localStorage and state
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      setUserInfo(data.data);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "An error occurred during login",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/login");
  };

  // Verify token is still valid
  const verifyToken = async () => {
    if (!userInfo || !userInfo.token) return false;

    try {
      const response = await fetch("http://localhost:5000/api/user-profile", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!response.ok) {
        // Token invalid, logout user
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  };

  const value = {
    userInfo,
    isLoggedIn: !!userInfo,
    login,
    logout,
    loading,
    verifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

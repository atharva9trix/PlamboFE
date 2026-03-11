import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { loginUser, signupUser } from "../../core/services/keycloakApi";
import { getUserInfoFromToken, isTokenValid } from "../../core/utils/authUtils";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = useCallback(() => {
    try {
      const token = localStorage.getItem("authToken");

      if (token && isTokenValid(token)) {
        const userData = getUserInfoFromToken(token);
        if (userData) {
          setUserInfo(userData);
        } else {
          localStorage.removeItem("authToken");
        }
      }
    } catch (error) {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginUser(email, password);

      if (response.data?.data?.access_token) {
        const token = response.data.data.access_token;

        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", response.data.data.refresh_token);

        const userData = getUserInfoFromToken(token);

        setUserInfo(userData);

        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      return {
        success: false,
        error:  "Login failed" || error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);

      const response = await signupUser(userData);

      if (response?.data?.success === false) {
        return {
          success: false,
          error: "Signup failed" || response.data.message,
        };
      }

      return {
        success: true,
        message:
          "Account created successfully. Please login." || response?.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        error:"User already exists" || error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  const value = {
    userInfo,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!userInfo && !loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
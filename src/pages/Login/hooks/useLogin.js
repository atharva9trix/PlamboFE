import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateLogin } from "../utils/loginValidation";
import { useAuth } from "../../../app/context/AuthContext";

export function useLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: authLoading } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async ({ email, password }) => {
    setError("");
    const validationError = validateLogin(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const result = await login(email, password);

      if (result.success) {
        
        navigate("/", { replace: true });
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    error,
    loading: loading || authLoading,
  };
}

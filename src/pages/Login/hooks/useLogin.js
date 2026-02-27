import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/loginValidation";
import { useAuth } from "../../../app/context/AuthContext";

export function useLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async ({ username, password }) => {
    setError("");

    const validationError = validateLogin(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const success = login(username, password);

      if (success) {
        navigate("/", { replace: true }); 
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
}
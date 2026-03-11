import { useState } from "react";
import { useAuth } from "../../../app/context/AuthContext";

export const useSignup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signup(userData);

      if (!result.success) {
        setError(result.error);
      }

      return result;
    } catch (err) {
      setError("Signup failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, error, loading };
};
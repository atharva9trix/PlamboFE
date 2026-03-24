import { useState } from "react";
import { forgotPassword } from "../../../core/services/keycloakApi";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async ({ email }) => {
    setLoading(true);
    setError("");

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleForgotPassword,
    loading,
    error,
    success,
  };
};
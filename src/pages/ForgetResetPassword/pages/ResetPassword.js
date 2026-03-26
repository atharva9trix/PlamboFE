import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";

import SplitAuthLayout from "../../Login/layouts/SplitAuthLayout";
import LoginHeader from "../../Login/components/LoginHeader";
import { inputStyles } from "../../Login/styles/login.styles";

import { resetPassword } from "../../../core/services/keycloakApi";
import {
  REALM,
  CLIENT_NAME,
} from "../../../core/constants/keycloakCredentials";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!newPassword || newPassword.length < 4) {
      tempErrors.newPassword = "Password must be at least 4 characters";
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!resetToken) {
      setError("Invalid or expired reset link");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        realm: REALM,
        clientName: CLIENT_NAME,
        newPassword,
        confirmPassword,
        resetToken,
      };

      await resetPassword(payload);

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SplitAuthLayout header={<LoginHeader />}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 600,
            mb: 3,
            textAlign: "center",
          }}
        >
          Reset Password
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
            mb: 3,
          }}
        >
          Enter your new password below.
        </Typography>

        <TextField
          fullWidth
          label="New Password"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (errors.newPassword) {
              setErrors((prev) => ({ ...prev, newPassword: "" }));
            }
          }}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          sx={inputStyles}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "rgba(255,255,255,0.4)" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ ...inputStyles, mt: 2 }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "rgba(255,255,255,0.4)" }} />
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Alert
            severity="error"
            variant="filled"
            sx={{
              mt: 2,
              borderRadius: "14px",
              bgcolor: "rgba(211, 47, 47, 0.8)",
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            variant="filled"
            sx={{
              mt: 2,
              borderRadius: "14px",
            }}
          >
            Password reset successful. Redirecting to login...
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          size="large"
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.7,
            borderRadius: "14px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
            boxShadow: "0 8px 20px rgba(33,150,243,0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 25px rgba(33,150,243,0.5)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </Box>
    </SplitAuthLayout>
  );
}

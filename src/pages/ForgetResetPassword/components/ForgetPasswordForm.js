import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { inputStyles } from "../../Login/styles/login.styles";

export default function ForgotPasswordForm({
  onSubmit,
  error: propError,
  loading: propLoading,
  success,
}) {
  const [email, setEmail] = useState("");
  const [localErrors, setLocalErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!email?.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email";
      valid = false;
    }

    setLocalErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({ email });
  };

  return (
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
        Enter your email and we'll send you a reset link.
      </Typography>

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        variant="filled"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (localErrors.email) {
            setLocalErrors((prev) => ({ ...prev, email: "" }));
          }
        }}
        error={!!localErrors.email}
        helperText={localErrors.email}
        sx={inputStyles}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "rgba(255,255,255,0.4)" }} />
            </InputAdornment>
          ),
        }}
      />

      {propError && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            mb: 2,
            borderRadius: "14px",
            bgcolor: "rgba(211, 47, 47, 0.8)",
          }}
        >
          {propError}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          variant="filled"
          sx={{
            mb: 2,
            borderRadius: "14px",
          }}
        >
          Reset link sent to your email.
        </Alert>
      )}

      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={propLoading}
        sx={{
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
        {propLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Send Reset Link"
        )}
      </Button>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          component={Link}
          to="/login"
          sx={{
            color: "#21cbf3",
            textTransform: "none",
            fontSize: "0.9rem",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );
}

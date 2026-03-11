import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { inputStyles } from "../styles/login.styles";

export default function LoginForm({
  onSubmit,
  error: propError,
  loading: propLoading,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

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

    if (!password?.trim()) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 4) {
      tempErrors.password = "Password must be at least 4 characters";
      valid = false;
    }

    setLocalErrors(tempErrors);
    setGeneralError("");
    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (localErrors.email) {
      setLocalErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (localErrors.password) {
      setLocalErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

   
    onSubmit({ email, password });
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
        Welcome Back
      </Typography>

      
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        variant="filled"
        value={email}
        onChange={handleEmailChange}
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
        mb={1.5}
      />

    
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="filled"
        value={password}
        onChange={handlePasswordChange}
        error={!!localErrors.password}
        helperText={localErrors.password}
        sx={inputStyles}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ color: "rgba(255,255,255,0.4)" }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        mb={2}
      />

  
      {(generalError || propError) && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            mb: 2,
            borderRadius: "14px",
            bgcolor: "rgba(211, 47, 47, 0.8)",
          }}
        >
          {generalError || propError}
        </Alert>
      )}

      
      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={propLoading}
        sx={{
          py: 2,
          borderRadius: "14px",
          fontWeight: 700,
          textTransform: "none",
          fontSize: "1.1rem",
          background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
          boxShadow: "0 8px 20px rgba(33,150,243,0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 25px rgba(33,150,243,0.5)",
            background: "linear-gradient(135deg, #21cbf3 0%, #21d4f8 100%)",
          },
          "&:disabled": {
            background: "rgba(33,150,243,0.6)",
            transform: "none",
          },
        }}
      >
        {propLoading ? "Signing In..." : "Sign In"}
      </Button>

     
      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}
        >
          Don't have an account?
        </Typography>
        <Button
          component={Link}
          to ="/signup"
          sx={{
            color: "#21cbf3",
            fontWeight: 500,
            textTransform: "none",
            fontSize: "1rem",
            p: 1,
            "&:hover": {
              bgcolor: "rgba(33,203,243,0.1)",
              borderRadius: "14px",
              transform: "translateY(-1px)",
            },
          }}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

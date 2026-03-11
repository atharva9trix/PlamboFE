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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { inputStyles } from "../../Login/styles/login.styles";

export default function SignupForm({ onSubmit, error, loading }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!formData.firstName?.trim()) {
      tempErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName?.trim()) {
      tempErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.username?.trim()) {
      tempErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.email?.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password?.trim()) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 4) {
      tempErrors.password = "Password must be at least 4 characters";
      valid = false;
    }

    if (!formData.confirmPassword?.trim()) {
      tempErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setLocalErrors(tempErrors);
    return valid;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));

    setLocalErrors((prev) => {
      const newErr = { ...prev };
      delete newErr[field];
      return newErr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLocalErrors({});
    setSuccessMessage("");

    const result = await onSubmit(formData);

    if (result?.success) {
      setSuccessMessage(result.message || "Account created successfully");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2500);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h6"
        sx={{ color: "white", fontWeight: 600, mb: 3, textAlign: "center" }}
      >
        Create Account
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: "14px" }}>
          {successMessage}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="First Name"
          variant="filled"
          value={formData.firstName}
          onChange={handleChange("firstName")}
          error={!!localErrors.firstName}
          helperText={localErrors.firstName}
          sx={inputStyles}
          InputProps={{ disableUnderline: true }}
        />

        <TextField
          label="Last Name"
          variant="filled"
          value={formData.lastName}
          onChange={handleChange("lastName")}
          error={!!localErrors.lastName}
          helperText={localErrors.lastName}
          sx={inputStyles}
          InputProps={{ disableUnderline: true }}
        />
      </Box>

      <TextField
        fullWidth
        label="Email"
        type="email"
        variant="filled"
        value={formData.email}
        onChange={handleChange("email")}
        error={!!localErrors.email}
        helperText={localErrors.email}
        sx={{ ...inputStyles, mb: 1.5 }}
        InputProps={{ disableUnderline: true }}
      />

      <TextField
        fullWidth
        label="Username"
        variant="filled"
        value={formData.username}
        onChange={handleChange("username")}
        error={!!localErrors.username}
        helperText={localErrors.username}
        sx={{ ...inputStyles, mb: 1.5 }}
        InputProps={{ disableUnderline: true }}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="filled"
        value={formData.password}
        onChange={handleChange("password")}
        error={!!localErrors.password}
        helperText={localErrors.password}
        sx={{ ...inputStyles, mb: 2 }}
        InputProps={{
          disableUnderline: true,
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
        type={showConfirmPassword ? "text" : "password"}
        variant="filled"
        value={formData.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={!!localErrors.confirmPassword}
        helperText={localErrors.confirmPassword}
        sx={{ ...inputStyles, mb: 2 }}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                sx={{ color: "rgba(255,255,255,0.4)" }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            mb: 2,
            borderRadius: "14px",
            bgcolor: "rgba(211, 47, 47, 0.8)",
          }}
        >
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={loading}
        sx={{
          py: 2,
          borderRadius: "14px",
          fontWeight: 700,
          textTransform: "none",
          fontSize: "1rem",
          background: "linear-gradient(135deg,#2196f3,#21cbf3)",
          boxShadow: "0 8px 20px rgba(33,150,243,0.3)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 25px rgba(33,150,243,0.5)",
          },
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.6)", mb: 0.5 }}
        >
          Already have an account?
        </Typography>

        <Button
          component={Link}
          to="/login"
          sx={{
            color: "#21cbf3",
            textTransform: "none",
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
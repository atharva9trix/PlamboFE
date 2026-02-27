import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { inputStyles } from "../styles/login.styles";

export default function LoginForm({ onSubmit, error, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: 600,
          mb: 4,
          textAlign: "center",
        }}
      >
        Welcome Back
      </Typography>

      <TextField
        fullWidth
        label="Username"
        variant="filled"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        sx={inputStyles}
        InputProps={{ disableUnderline: true }}
      />

      <TextField
        fullWidth
        label="Password"
        type={
          showPassword ? "text" : "password"
        }
        variant="filled"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        sx={inputStyles}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                sx={{
                  color:
                    "rgba(255,255,255,0.4)",
                }}
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
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
            mb: 3,
            borderRadius: "14px",
            bgcolor:
              "rgba(211, 47, 47, 0.8)",
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
          background:
            "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
          boxShadow:
            "0 8px 20px rgba(33,150,243,0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform:
              "translateY(-2px)",
            boxShadow:
              "0 12px 25px rgba(33,150,243,0.5)",
          },
        }}
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </Button>
    </Box>
  );
}
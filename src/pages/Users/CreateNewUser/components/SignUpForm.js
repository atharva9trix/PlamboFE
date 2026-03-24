import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import { getRoles } from "../../../../core/services/keycloakApi";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#f5f5f5",
    fontSize: 14,
    height: 46,
    borderRadius: 2,
    background: "rgba(255, 255, 255, 0.04)",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.15)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(245, 245, 245, 0.8)",
      borderWidth: "1.5px",
    },
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.08)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 13,
    "&.Mui-focused": {
      color: "#f5f5f5",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "rgba(255, 255, 255, 0.6)",
  },
};

const SignupForm = ({ formData, handleChange, handleSubmit }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res?.data?.data || []);
      } catch (err) {
      
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
            required
          />
        </Stack>

        <TextField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          sx={inputStyle}
          required
        />

        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
          required
        />

        <FormControl fullWidth sx={inputStyle} required>
          <InputLabel>Assign Role</InputLabel>
          <Select
            value={formData.role || ""}
            label="Assign Role"
            onChange={(e) =>
              handleChange({ target: { name: "role", value: e.target.value } })
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 1,
                  background: "rgba(20, 20, 20, 0.7)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#f5f5f5",
                  "& .MuiMenuItem-root": {
                    fontSize: 14,
                    py: 1.5,
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-selected": {
                      background: "rgba(255, 255, 255, 0.15)",
                      fontWeight: 600,
                      "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
                    },
                  },
                },
              },
            }}
          >
            {loading ? (
              <MenuItem disabled sx={{ justifyContent: "center" }}>
                <CircularProgress size={20} sx={{ color: "white" }} />
              </MenuItem>
            ) : (
              roles.map((role) => (
                <MenuItem key={role.id} value={role}>
                  {role.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            width: "180px",
            mt: 1,
            alignSelf: "center",
            py: 1.2,
            fontSize: 14,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            background: "#9c27b0",
            boxShadow: "0 4px 14px 0 rgba(156, 39, 176, 0.4)",
            "&:hover": {
              background: "#7b1fa2",
              boxShadow: "0 6px 20px 0 rgba(156, 39, 176, 0.5)",
            },
          }}
        >
          Create User
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupForm;

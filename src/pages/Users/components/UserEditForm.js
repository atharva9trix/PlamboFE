import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Autocomplete,
  Stack,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockReset,
  Save,
  Person,
  Security,
} from "@mui/icons-material";

import {
  getRoles,
  getUserRoleMappings,
  updateUserProfile,
  resetUserPassword,
  assignRoleToUser,
  removeRoleFromUser,
} from "../../../core/services/keycloakApi";

import {
  REALM,
  CLIENT_NAME,
} from "../../../core/constants/keycloakCredentials";
import inputStyle from "../styles/styles";

const TabPanel = ({ children, value, index }) => (
  <Box hidden={value !== index} sx={{ pt: 1 }}>
    {value === index && <Box>{children}</Box>}
  </Box>
);

const UserEditForm = ({ userId, formData, setFormData, onSuccess }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    Promise.all([getRoles(), getUserRoleMappings(userId)]).then(
      ([rolesRes, userRolesRes]) => {
        setRoles(rolesRes?.data?.data || []);
        const mappings = userRolesRes?.data?.data?.clientMappings;
        setUserRoles(
          mappings
            ? Object.values(mappings).flatMap((c) => c.mappings || [])
            : [],
        );
      },
    );
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(userId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      onSuccess?.("User updated");
    } catch {
      onSuccess?.("Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const form = new URLSearchParams({
        realm: REALM,
        userId,
        newPassword,
        clientId: CLIENT_NAME,
      });

      await resetUserPassword(form);

      onSuccess?.("Password reset");
      setResetOpen(false);
      setNewPassword("");
    } catch {
      onSuccess?.("Reset failed", "error");
    }
  };

  const handleUpdateRole = async (event, newSelectedRole) => {
    if (!newSelectedRole) return;

    setRoleLoading(true);
    const currentRole = userRoles[0] || null;

    try {
      if (currentRole && currentRole.id !== newSelectedRole.id) {
        await removeRoleFromUser(userId, { ...currentRole });
      }

      await assignRoleToUser(userId, { ...newSelectedRole });

      setUserRoles([newSelectedRole]);
      onSuccess?.(`Role updated to "${newSelectedRole.name}"`);
    } catch {
      onSuccess?.("Failed to update role", "error");
    } finally {
      setRoleLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 1.5,
        borderRadius: 2,
        background: "rgba(255,255,255,0.05)",
        color: "#fff",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        variant="fullWidth"
        sx={{
          mb: 1.5,
          minHeight: 30,
          "& .MuiTab-root": {
            minHeight: 30,
            fontSize: 13,
            fontWeight: 600,
            color: "#aaa",
          },
          "& .Mui-selected": {
            color: "#fff",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#101112",
          },
        }}
      >
        <Tab
          icon={<Person sx={{ fontSize: 18, color: "#fff" }} />}
          label="Details"
        />
        <Tab
          icon={<Security sx={{ fontSize: 18, color: "#fff" }} />}
          label="Roles"
        />
        <Tab
          icon={<LockReset sx={{ fontSize: 18, color: "#fff" }} />}
          label="Password"
        />
      </Tabs>

     
      <TabPanel value={tabIndex} index={0}>
        <Stack spacing={1.5} component="form" onSubmit={handleUpdateUser}>
          <TextField
            label="Username"
            value={formData.username}
            disabled
            size="small"
            sx={inputStyle}
          />
          <TextField
            label="First Name"
            size="small"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            sx={inputStyle}
          />
          <TextField
            label="Last Name"
            size="small"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            sx={inputStyle}
          />
          <TextField
            label="Email"
            size="small"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            sx={inputStyle}
          />

          <Button
            size="small"
            type="submit"
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress size={14} />
              ) : (
                <Save sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              width: "160px",
              alignSelf: "center",
              fontSize: 13,
              textTransform: "none",
              borderRadius: 1.5,
              background: "#9c27b0",
              color: "#fff",
              "&:hover": {
                background: "#7b1fa2",
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </TabPanel>

     
      <TabPanel value={tabIndex} index={1}>
        <Autocomplete
          size="small"
          options={roles}
          getOptionLabel={(option) => option.name}
          value={userRoles[0] || null}
          onChange={handleUpdateRole}
          loading={roleLoading}
          PaperComponent={(props) => (
            <Paper
              {...props}
              sx={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            />
          )}
          sx={{
            "& .MuiInputBase-root": {
              color: "#fff",
              fontSize: 14,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
            },
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Role" sx={inputStyle} />
          )}
        />
      </TabPanel>

  
      <TabPanel value={tabIndex} index={2}>
        <Stack alignItems="center">
          <Button
            variant="outlined"
            size="small"
            sx={{
              fontSize: 13,
              textTransform: "none",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.4)",
            }}
            onClick={() => setResetOpen(true)}
          >
            Reset Password
          </Button>
        </Stack>
      </TabPanel>

 
      <Dialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        maxWidth="xs"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
          },
        }}
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 2,
            color: "#fff",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 16 }}>Reset Password</DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <TextField
            fullWidth
            size="small"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={inputStyle}
            placeholder="Enter new password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#fff" }} />
                    ) : (
                      <Visibility sx={{ color: "#fff" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={() => setResetOpen(false)}
            variant="outlined"
            sx={{
              color: "#fff",
              fontSize: 13,
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleResetPassword}
            sx={{
              fontSize: 13,
              background: "#9c27b0",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                background: "#7b1fa2",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserEditForm;

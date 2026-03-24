import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import Signup from "./CreateNewUser/components/Signup";
import UserList from "./components/UserList";
import { getUsersByClient } from "../../core/services/keycloakApi";
import ModeButtons from "../Home/components/ModeButtons";

export default function Users() {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    upass: "",
    role_id: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleFormSuccess = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    if (tabIndex === 0) fetchUsers();
  }, [tabIndex]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUsersByClient();
      const apiUsers = response?.data?.data || [];

      const normalizedUsers = apiUsers
        .filter((u) => u.enabled)
        .map((u) => ({
          uid: u.id,
          id: u.id,
          uname: u.username,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          email: u.email,
          enabled: u.enabled,
          raw: u,
        }));

      setUsers(normalizedUsers);
    } catch (err) {
      setError("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSnackbar({
      open: true,
      message: "User updated successfully!",
      severity: "success",
    });
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        height: "97vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ pr: 4, pl: 22, flexShrink: 0 }}>
        <ModeButtons />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 4,
          px: 7,
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1050,
            p: 2,
            borderRadius: 2,
            background: "transparent",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "white",
            ml: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            <GroupIcon sx={{ mr: 1, color: "white", fontSize: 22 }} />
            <Typography variant="h6" fontWeight={600} fontSize={18}>
              User Management
            </Typography>
          </Box>

          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            variant="fullWidth"
            textColor="inherit"
            sx={{
              mb: 1.5,
              minHeight: 36,
              "& .MuiTab-root": {
                color: "white",
                fontSize: 12,
                minHeight: 36,
              },
            }}
          >
            <Tab
              icon={<PersonIcon sx={{ fontSize: 16 }} />}
              label="User List"
            />
            <Tab icon={<GroupAddIcon sx={{ fontSize: 16 }} />} label="Signup" />
          </Tabs>

          {tabIndex === 0 &&
            (loading ? (
              <Box display="flex" justifyContent="center" minHeight="28vh">
                <CircularProgress size={26} sx={{ color: "white" }} />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <UserList
                users={users}
                selectedUser={selectedUser}
                isEditing={isEditing}
                setSelectedUser={setSelectedUser}
                setIsEditing={setIsEditing}
                setFormData={setFormData}
                formData={formData}
                handleChange={handleChange}
                handleUpdate={handleUpdate}
                onFormSuccess={handleFormSuccess}
              />
            ))}

          {tabIndex === 1 && <Signup />}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3500}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
          </Snackbar>
        </Paper>
      </Box>
    </Box>
  );
}

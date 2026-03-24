import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  Alert,
  Divider,
  Grid,
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeButtons from "../../Home/components/ModeButtons";

import { useAuth } from "../../../app/context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../core/services/keycloakApi";
import textFieldStyle from "../styles/styles";

export default function ProfilePanel() {
  const theme = useTheme();
  const { userInfo } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [tab, setTab] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!userInfo?.id) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(userInfo.id);
        const u = res?.data?.data;

        if (!u) throw new Error("Invalid user response");

        const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim();

        setUser({
          ...u,
          name: fullName,
          joinedOn: u.createdTimestamp,
        });

        setFormData({
          name: fullName,
          email: u.email || "",
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load profile",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userInfo]);

  const handleSave = async () => {
    if (!userInfo?.id) return;

    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      firstName,
      lastName,
      email: formData.email,
    };

    try {
      const res = await updateUserProfile(userInfo.id, payload);

      if (res?.data?.status === "success" || res.status === 200) {
        setUser((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          firstName,
          lastName,
        }));

        setTab(0);

        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Update failed",
        severity: "error",
      });
    }
  };

  const isAdmin = userInfo?.role === "admin";

  const RoleIcon = isAdmin ? AdminPanelSettingsIcon : PersonIcon;
  const roleLabel = isAdmin ? "Admin" : "User";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <ModeButtons />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            minHeight: "72vh",
            borderRadius: 4,
            maxWidth: 700,
            width: "100%",
            background: "rgba(255,255,255,0.0)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            align="center"
            sx={{ mb: 2 }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            Profile Panel
          </Typography>

          <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />

          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              sx={{ minHeight: "40vh" }}
            >
              <CircularProgress size={40} />
            </Box>
          )}

          {!loading && user && (
            <>
              <Box textAlign="center" mb={2}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: theme.palette.error.main,
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <RoleIcon sx={{ fontSize: 40 }} />
                </Avatar>

                <Typography variant="h6" fontWeight={600}>
                  {user.name}
                </Typography>

                <Chip
                  label={roleLabel}
                  size="small"
                  sx={{
                    mt: 1,
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                />
              </Box>

              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": {
                    color: "rgba(255,255,255,0.6)",
                  },

                  "& .MuiTabs-indicator": {
                    backgroundColor: "#070202",
                    color: "white",
                    height: 3,
                    borderRadius: 2,
                  },
                }}
              >
                <Tab label="View Profile" />
                <Tab label="Edit Profile" />
              </Tabs>

            

              {tab === 0 && (
                <>
                  <Card
                    sx={{
                      mt:3,
                      mb: 1.5,
                      background: "rgba(255,255,255,0.06)",
                      color: "white",
                    }}
                  >
                    <CardContent sx={{ display: "flex", gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="body2">{user.email}</Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "white",
                    }}
                  >
                    <CardContent sx={{ display: "flex", gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2">
                        Joined:{" "}
                        {user.joinedOn
                          ? new Date(user.joinedOn).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              )}

              {tab === 1 && (
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <TextField
                    label="Full Name"
                    fullWidth
                    size="small"
                    sx={textFieldStyle}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    InputProps={{ sx: { color: "white" } }}
                  />

                  <TextField
                    label="Email"
                    fullWidth
                    size="small"
                    sx={textFieldStyle}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    InputProps={{ sx: { color: "white" } }}
                  />

                  <Grid container spacing={2} justifyContent="center" mt={3}>
                    <Grid item>
                      <Button
                        startIcon={<SaveIcon />}
                        size="small"
                        onClick={handleSave}
                        sx={{
                          background: "#6a0dad",
                          color: "#fff",
                          px: 3,
                          "&:hover": {
                            background: "#5a009d",
                          },
                        }}
                      >
                        Save
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button
                        startIcon={<CancelIcon />}
                        size="small"
                        onClick={() => setTab(0)}
                        sx={{
                          color: "#fff",
                          border: "1px solid #f0e4e4",
                          px: 3,
                          "&:hover": {
                            background: "red",
                            borderColor: "red",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          )}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
          </Snackbar>
        </Paper>
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Fade,
} from "@mui/material";
import { useAuth } from "../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  const userInitial = userInfo?.username
    ? userInfo.username.charAt(0).toUpperCase()
    : "U";

  return (
    <Box
      sx={{
        width: "100%",
        py: 1.2,
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "visible",
      }}
    >
      <Box
        onClick={handleProfileClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1,
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(255,255,255,0.08)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: "transparent",
            color: "#fff",
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(6px)",
            transition: "all 0.3s ease",
            "&:hover": { boxShadow: "0 0 12px rgba(33,150,243,0.7)" },
          }}
        >
          {userInitial}
        </Avatar>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {userInfo?.username || "User"}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableScrollLock
        PaperProps={{
          sx: {
            mb: 1.5,
            minWidth: 200,
            borderRadius: "16px",
            background: "rgba(15,15,15,0.9)",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
            padding: "8px",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            textAlign: "center",
            opacity: 0.85,
            fontSize: "13px",
          }}
        >
          Signed in as
          <Typography sx={{ fontWeight: 600, fontSize: "14px", mt: 0.5 }}>
            {userInfo?.username}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.2,
            borderRadius: "12px",
            justifyContent: "center",
            fontWeight: 500,
            transition: "all 0.25s ease",
            "&:hover": {
              background: "rgba(244, 67, 54, 0.15)",
              color: "#ff5252",
              transform: "scale(1.03)",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

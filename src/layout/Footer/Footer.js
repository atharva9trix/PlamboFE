import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Fade,
  Stack,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";
import menuItemStyle from "./styles";

export default function Footer() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const goTo = (path) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  const userInitial = userInfo?.username?.charAt(0).toUpperCase() || "U";

  const isAdmin =
    userInfo?.role === "admin" || userInfo?.roles?.includes("admin");

  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        ml: 1.2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          px: 1.8,
          py: 0.7,
          borderRadius: "20px",
          cursor: "pointer",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.15)",
          transition: "all 0.25s ease",
          "&:hover": {
            background: "rgba(255,255,255,0.08)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          {userInitial}
        </Avatar>

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 500,
            color: "#fff",
            letterSpacing: 0.3,
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
        PaperProps={{
          sx: {
            mt: -1,
            minWidth: 200,
            borderRadius: 3,
            background: "rgba(20,20,20,0.95)",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            p: 1,
          },
        }}
      >
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Typography sx={{ fontSize: 11, opacity: 0.6 }}>
            Signed in as
          </Typography>

          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {userInfo?.username}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 1 }} />

        
        <MenuItem onClick={() => goTo("/profile")} sx={menuItemStyle}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <PersonOutlineIcon fontSize="small" />
            <Typography fontSize={13}>Profile</Typography>
          </Stack>
        </MenuItem>

    
        {isAdmin && (
          <MenuItem onClick={() => goTo("/users")} sx={menuItemStyle}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <GroupOutlinedIcon fontSize="small" />
              <Typography fontSize={13}>Users</Typography>
            </Stack>
          </MenuItem>
        )}

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />

  
        <MenuItem
          onClick={handleLogout}
          sx={{
            ...menuItemStyle,
            "&:hover": {
              background: "rgba(244,67,54,0.12)",
              color: "#ff5252",
            },
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <LogoutIcon fontSize="small" />
            <Typography fontSize={13}>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}

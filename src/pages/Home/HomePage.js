import { Box, Typography, Drawer, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../../app/context/useApp";
import Background from "../../ui/components/Background";
import ChatHistory from "./components/ChatHistory";
import ChatHistoryList from "./components/ChatHistoryList";
import QueryInput from "./components/QueryInput";
import ModeButtons from "./components/ModeButtons";
import KpiSection from "./components/KpiSection";
import AppAlert from "../../ui/components/AppAlert";

export default function HomePage() {
  const {
    messages,
    clients,
    selectedClient,
    setSelectedClient,
    alert,
    setAlert,
    activeMode,
    setActiveMode,
  } = useApp();

  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveMode(null);
    }
  }, [location.pathname, setActiveMode]);


  const showEmptyState = !activeMode && messages.length === 0;
  const showChat = messages.length > 0 && !activeMode;

  return (
    <Box sx={{ height: "100vh", position: "relative", display: "flex" }}>
      <Background />

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: 260, background: "#0f172a" } }}
      >
        <Box sx={{ p: 2, color: "white" }}>
          <Typography sx={{ mb: 1 }}>Client</Typography>
          <Select
            fullWidth
            value={selectedClient || ""}
            sx={{ color: "white", mb: 2 }}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {clients.map((c) => (
              <MenuItem key={c.Id} value={c}>
                {c.Client_Name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <ChatHistoryList onClose={() => setOpen(false)} />
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {showEmptyState && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              color: "white",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography sx={{ fontSize: 32, fontWeight: 500 }}>
                What’s on your mind?
              </Typography>
              <Box sx={{ width: "100%", maxWidth: 720 }}>
                <QueryInput />
                <ModeButtons />
              </Box>
            </Box>

            {selectedClient && (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pb: 3 }}>
                <KpiSection />
              </Box>
            )}
          </Box>
        )}

        {showChat && (
          <>
            <Box sx={{ mt: 0.5, px: 4, flexShrink: 0 }}>
              <ModeButtons hideBrief />
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 4 }}>
              <ChatHistory />
            </Box>

            <Box sx={{ px: { xs: 4, md: 20, lg: 45 }, pb: 2, pt: 2, flexShrink: 0 }}>
              <QueryInput />
            </Box>
          </>
        )}
      </Box>

      <AppAlert
        open={alert?.open || false}
        title={alert?.title || ""}
        message={alert?.message || ""}
        onClose={() => setAlert && setAlert({ open: false, title: "", message: "" })}
      />
    </Box>
  );
}
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../../app/providers/AppProvider";
import AppAlert from "../../../ui/components/AppAlert";
import { createSession } from "../../../core/services/appService";

export default function ModeButtons({ hideBrief = false }) {
  const { selectedClient, sendQuery, setActiveMode, setSessionId } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [alert, setAlert] = useState({
    open: false,
    title: "",
    message: "",
    isComingSoon: false,
  });

  const openAlert = (title, message, isComingSoon = false) =>
    setAlert({ open: true, title, message, isComingSoon });

  const path = location.pathname;

  const modeMap = {
    "/": ["Analyze", "Brief", "Generate", "Audience", "Activate"],
    "/analyze": ["Home", "Generate", "Audience", "Activate"],
    "/generate": ["Home", "Analyze", "Audience", "Activate"],
    "/audience": ["Home", "Analyze", "Generate", "Activate"],
    "/activate": ["Home", "Analyze", "Generate", "Audience"],
    "/brief": ["Analyze", "Generate", "Audience", "Activate"],
  };

  let modes =
    modeMap[path] || ["Home", "Analyze", "Generate", "Audience", "Activate"];

  
  if (hideBrief) {
    modes = modes.filter((m) => m !== "Brief");
  }

  const handleAction = async (mode) => {
    if (mode === "Home") {
      setActiveMode(null);
      navigate("/");
      return;
    }

    if (!selectedClient || !selectedClient.Client_Name) {
      return openAlert(
        "Client Required",
        "Please select a client before continuing."
      );
    }

    if (mode === "Analyze") {
      try {
        const userId = selectedClient?.Id || 1;
        const sessionData = await createSession(userId);

        setSessionId(sessionData.session_id);
        setActiveMode("Analyze");
        navigate("/analyze");
      } catch (error) {
        openAlert("Error", error.message || "Failed to create session");
      }
      return;
    }

    if (mode === "Brief") {
      setActiveMode("Brief");
      navigate("/brief");
      return;
    }

    if (mode === "Generate") {
      setActiveMode("Generate");
      navigate("/generate");
      return;
    }

    if (mode === "Audience") {
      setActiveMode("Audience");
      navigate("/audience");
      return;
    }

    if (mode === "Activate") {
      setActiveMode("Activate");
      navigate("/activate");
      return;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
          mt: 1,
        }}
      >
        {modes.map((m) => (
          <Box
            key={m}
            onClick={() => handleAction(m)}
            sx={{
              px: 3.2,
              py: 1.1,
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.1))",
              color: "white",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              transition: "all 0.2s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))",
                transform: "translateY(-2px)",
              },
            }}
          >
            {m}
          </Box>
        ))}
      </Box>

      <AppAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        isComingSoon={alert.isComingSoon}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </>
  );
}
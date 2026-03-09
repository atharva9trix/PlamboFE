import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../../app/context/useApp";
import AppAlert from "../../../ui/components/AppAlert";
import { createSession } from "../../../core/services/appService";

export default function ModeButtons({ hideBrief = false }) {
  const { selectedClient, setActiveMode, setSessionId, activeMode } = useApp();
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


  let modes =
    ["Brief", "Analyze", "Generate", "Audience", "Activate"];

 
  useEffect(() => {
    if (activeMode && !modes.includes(activeMode)) {
      modes = [activeMode, ...modes];
    }
  }, [activeMode, path]);

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

 
  const getActiveMode = () => {
    if (path.includes("analyze")) return "Analyze";
    if (path.includes("brief")) return "Brief";
    if (path.includes("generate")) return "Generate";
    if (path.includes("audience")) return "Audience";
    if (path.includes("activate")) return "Activate";
    return null;
  };

  const currentActive = getActiveMode();

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
        {modes.map((m) => {
          const isActive = m === currentActive;

          return (
            <Box
              key={m}
              onClick={() => handleAction(m)}
              sx={{
                px: 3.2,
                py: 1.1,
                borderRadius: "24px",
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease",
                background: isActive
                  ? "linear-gradient(135deg, #ffffff, #d3d3d3)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.1))",

                color: isActive ? "#000" : "white",
                fontWeight: isActive ? "700" : "400",
                boxShadow: isActive
                  ? "0 0 10px rgba(255,255,255,0.6)"
                  : "none",

                "&:hover": {
                  background: isActive
                    ? "linear-gradient(135deg, #ffffff, #d3d3d3)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {m}
            </Box>
          );
        })}
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
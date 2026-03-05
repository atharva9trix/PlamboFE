import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AppDropdown from "../../ui/components/AppDropdown";
import logo from "../../assets/logo.png";
import { useApp } from "../../app/providers/AppProvider";
import ChatHistoryList from "../../pages/Home/components/ChatHistoryList";
import AppAlert from "../../ui/components/AppAlert";
import CreateEntityModal from "../../ui/components/EntityModal";

export default function Header() {
  const {
    goHome,
    clients = [],
    selectedClient,
    setSelectedClient,
    projects = [],
    createClient,
    createProject,
    loading,
    showAlert,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    if (selectedClient && !clients.find((c) => c.Id === selectedClient.Id)) {
      setSelectedClient(null);
    }
  }, [clients, selectedClient, setSelectedClient]);

  const safeClient =
    selectedClient && clients.find((c) => c.Id === selectedClient.Id)
      ? selectedClient
      : null;

  const handleClientChange = async (client) => {
    if (loading) {
      showAlert(
        "Please Wait",
        "Wait while the response is generating before switching clients."
      );
      return;
    }
    await setSelectedClient(client);
    navigate("/", { replace: true });
  };

  const activeProjectId = location.pathname.startsWith("/project/")
    ? location.pathname.split("/project/")[1]
    : null;

  const handleProjectClick = (project) => {
    if (!loading) navigate(`/project/${project.Id}`);
  };

  const handleCreateClient = async (name) => {
    await createClient(name);
  };

  const handleCreateProject = async (name) => {
    await createProject(name);
  };

  return (
    <>
      <Box sx={{ px: 3 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 240,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
    
          <Box
            sx={{
              mt: -1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              cursor: "pointer",
              transition: "0.2s ease",
              "&:hover": {
                opacity: 0.85,
              },
            }}
          onClick={() => goHome(navigate)}
          >
            <img src={logo} alt="logo" width="74" />
            <Typography
              sx={{
                mt: -2,
                mb: 1,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.15,
                color: "#fff",
                userSelect: "none",
              }}
            >
              Performance
              <br />
              Branding Platform
            </Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
            <AppDropdown
              options={clients}
              value={safeClient}
              onChange={handleClientChange}
              disabled={loading}
            />
            <Button
              onClick={() => setClientModalOpen(true)}
              disabled={loading}
              sx={{
                p: 0,
                minWidth: 0,
                mt: 1,
                textTransform: "none",
                fontSize: 13,
                fontWeight: 400,
                color: "#fff",
                "&.Mui-disabled": {
                  color: "#fff",
                  opacity: 0.4,
                  cursor: "not-allowed",
                },
                "&:hover": { background: "transparent" },
              }}
            >
              + new client
            </Button>
          </Box>

          {safeClient && (
            <Box sx={{ width: "100%", mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: "0.05em",
                  textTransform: "capitalize",
                  mb: 1,
                  color: "rgba(234,231,226,0.45)",
                }}
              >
                Projects
              </Typography>

              {projects.map((project) => {
                const isActive = String(project.Id) === String(activeProjectId);
                return (
                  <Typography
                    key={project.Id}
                    onClick={() => handleProjectClick(project)}
                    sx={{
                      fontSize: 13,
                      fontWeight: 400,
                      py: 0.6,
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      color: isActive ? "#fff" : "rgba(234,231,226,0.85)",
                      background: isActive
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                      borderRadius: 1,
                      px: 1,
                      opacity: loading ? 0.5 : 1,
                      pointerEvents: loading ? "none" : "auto",
                      "&:hover": {
                        color: "#fff",
                        background: "rgba(255,255,255,0.05)",
                      },
                    }}
                  >
                    {project.Project_Name}
                  </Typography>
                );
              })}

              <Button
                onClick={() => setProjectModalOpen(true)}
                disabled={loading}
                sx={{
                  p: 0,
                  minWidth: 0,
                  mt: 1,
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 400,
                  color: "#fff",
                  "&.Mui-disabled": {
                    color: "#fff",
                    opacity: 0.4,
                    cursor: "not-allowed",
                  },
                  "&:hover": { background: "transparent" },
                }}
              >
                + new project
              </Button>

              <Divider
                sx={{ mt: 2, mb: 1, borderColor: "rgba(255,255,255,0.15)" }}
              />
            </Box>
          )}

          {safeClient &&
            !location.pathname.startsWith("/project/") &&
            ![
              "/analyze",
              "/generate",
              "/generate/chatgpt",
              "/audience",
              "/activate",
              "/generate/canva",
            ].includes(location.pathname) && (
              <Box
                sx={{
                  width: "100%",
                  maxHeight: 280,
                  overflowY: "auto",
                  opacity: loading ? 0.5 : 1,
                  pointerEvents: loading ? "none" : "auto",
                }}
              >
                <ChatHistoryList inline />
              </Box>
            )}
        </Box>
      </Box>

      <CreateEntityModal
        open={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        title="Create New Client"
        placeholder="Enter client name"
        onSubmit={handleCreateClient}
        loading={loading}
      />

      <CreateEntityModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        title="Create New Project"
        placeholder="Enter project name"
        onSubmit={handleCreateProject}
        loading={loading}
      />

      <AppAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Coming Soon"
        message="The Projects management feature will be available in an upcoming release."
        isComingSoon
      />
    </>
  );
}

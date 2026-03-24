import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useLocation, useNavigate } from "react-router-dom";
import AppDropdown from "../../ui/components/AppDropdown";
import logo from "../../assets/logo.png";
import { useApp } from "../../app/context/useApp";
import ChatHistoryList from "../../pages/Home/components/ChatHistoryList";
import AppAlert from "../../ui/components/AppAlert";
import CreateEntityModal from "../../ui/components/EntityModal";
import { uploadKnowledgeBase } from "../../core/services/appService";
import UploadKnowledgeBaseModal from "./components/UploadKBModal";

export default function Header() {
  const {
    goHome,
    clients = [],
    selectedClient,
    setSelectedClient,
    projects = [],
    createClient,
    createProject,
    isGenerating,
    showAlert,
    createNewChat,
    setMessages,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const [kbUploading, setKbUploading] = useState(false);
  const [kbModalOpen, setKbModalOpen] = useState(false);

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
    if (isGenerating) {
      showAlert(
        "Please Wait",
        "Wait while the response is generating before switching clients.",
      );
      return;
    }

    const previousClient = selectedClient;

    await setSelectedClient(client);

    if (previousClient && previousClient.Id !== client.Id) {
      createNewChat(client);
    }
    navigate("/", { replace: true });
  };

  const activeProjectId = location.pathname.startsWith("/project/")
    ? location.pathname.split("/project/")[1]
    : null;

  const handleProjectClick = (project) => {
    if (!isGenerating) navigate(`/project/${project.Id}`);
  };

  return (
    <>
      <Box
        sx={{
          px: 2,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 200,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "hidden",
            minHeight: 0,
            pointerEvents: isGenerating ? "none" : "auto",
            opacity: isGenerating ? 0.7 : 1,
          }}
        >
          <Box
            sx={{
              mt: -1,
              display: "flex",
              flexDirection: "column",
              cursor: isGenerating ? "not-allowed" : "pointer",
            }}
            onClick={() => !isGenerating && goHome(navigate, setMessages)}
          >
            <img src={logo} alt="logo" width="74" />

            <Typography
              sx={{
                mt: -2,
                mb: 1,
                fontSize: 22,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              Performance
              <br />
              Branding Platform
            </Typography>
          </Box>

          <Box sx={{ width: "100%", flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AppDropdown
                options={clients}
                value={safeClient}
                onChange={handleClientChange}
                disabled={isGenerating}
              />

              {safeClient && (
                <Tooltip title="Upload Knowledge Base">
                  <IconButton
                    size="small"
                    onClick={() => setKbModalOpen(true)}
                    sx={{
                      color: "#fff",
                      background: "rgba(255,255,255,0.08)",
                      "&:hover": {
                        background: "rgba(255,255,255,0.18)",
                      },
                    }}
                  >
                    <UploadFileIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Button
              onClick={() => setClientModalOpen(true)}
              sx={{
                p: 0,
                mt: 1,
                textTransform: "none",
                fontSize: 13,
                color: "#fff",
              }}
            >
              + new client
            </Button>
          </Box>

          {safeClient && (
            <>
              <Box sx={{ width: "100%", flexShrink: 0 }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    mb: 1,
                    color: "rgba(234,231,226,0.45)",
                  }}
                >
                  Projects
                </Typography>

                <Box
                  sx={{
                    maxHeight: "20vh",
                    overflowY: "auto",
                    pr: 1,
                    minHeight: 0,
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {projects.map((project) => {
                    const isActive =
                      String(project.Id) === String(activeProjectId);

                    return (
                      <Typography
                        key={project.Id}
                        onClick={() => handleProjectClick(project)}
                        sx={{
                          fontSize: 13,
                          lineHeight: 1.7,
                          display: "block",
                          py: 0.5,
                          cursor: "pointer",
                          wordBreak: "break-word",
                          color: isActive ? "#fff" : "rgba(234,231,226,0.85)",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                      >
                        {project.Project_Name}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>

              <Divider
                sx={{
                  mt: 0.5,
                  borderColor: "rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}
              />
            </>
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
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                }}
              >
                <ChatHistoryList />
              </Box>
            )}
        </Box>
      </Box>

      <UploadKnowledgeBaseModal
        open={kbModalOpen}
        onClose={() => setKbModalOpen(false)}
        loading={kbUploading}
        onUpload={async (file) => {
          try {
            setKbUploading(true);
            const res = await uploadKnowledgeBase(file, safeClient.Client_Name);
            showAlert(
              "Success",
              res.message || "Knowledge base uploaded successfully.",
            );
            setKbModalOpen(false);
          } catch (error) {
            showAlert("Error", error.message || "Upload failed.");
          } finally {
            setKbUploading(false);
          }
        }}
      />

      <CreateEntityModal
        open={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        title="Create New Client"
        placeholder="Enter client name"
        onSubmit={(name) => createClient(name)}
        isGenerating={isGenerating}
      />

      <CreateEntityModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        title="Create New Project"
        placeholder="Enter project name"
        onSubmit={(name) => createProject(name)}
        isGenerating={isGenerating}
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
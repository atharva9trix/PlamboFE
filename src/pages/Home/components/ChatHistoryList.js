import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApp } from "../../../app/providers/AppProvider";

export default function ChatHistoryList() {
  const {
    chatSessions,
    loadChatSession,
    deleteChatSession,
    selectedClient,
    createNewChat,
    currentChatSession,
    isGenerating,
    showAlert,
  } = useApp();

  const [renderTrigger, setRenderTrigger] = useState(0);

  const clientSessions = chatSessions
    .filter((s) => s.clientId === selectedClient?.Id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    setRenderTrigger((prev) => prev + 1);
  }, [selectedClient, chatSessions]);

  const hasNewChat = clientSessions.some((s) => s.title === "New Chat");

  const handleLoad = (sessionId) => {
    if (isGenerating) {
      showAlert(
        "Response in progress",
        "A response is currently being generated. Please wait for it to finish before switching chats."
      );
      return;
    }
    loadChatSession(sessionId);
  };

  return (
    <Box>
      <Button
        fullWidth
        variant="text"
        onClick={() => selectedClient && createNewChat(selectedClient)}
        sx={{
          justifyContent: "flex-start",
          pl: 0,
          mb: 1,
          fontSize: 13,
          fontWeight: 900,
          textTransform: "none",
          color: "rgba(234,231,226,0.45)",
          "&:hover": {
            background: "transparent",
            color: "rgba(234,231,226,0.45)",
            textDecoration: "underline",
          },
        }}
      >
        + New chat
      </Button>

      <Typography
        sx={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          mb: 1,
          color: "rgba(234,231,226,0.45)",
        }}
      >
        Your chats
      </Typography>

      {clientSessions.length === 0 ? (
        <Typography
          sx={{
            color: "rgba(234,231,226,0.5)",
            textAlign: "left",
            fontSize: 12,
          }}
        >
          No chats yet
        </Typography>
      ) : (
        clientSessions.map((session) => (
          <Box
            key={session.id}
            onClick={() => handleLoad(session.id)}
            sx={{
              py: 0.6,
              px: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "6px",
              color:
                session.id === currentChatSession?.id
                  ? "#fff"
                  : "rgba(234,231,226,0.75)",
              background:
                session.id === currentChatSession?.id
                  ? "rgba(255,255,255,0.12)"
                  : "transparent",
              "&:hover": {
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
              {session.title || "Untitled Chat"}
            </Typography>

            {hasNewChat && session.title !== "New Chat" && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isGenerating) {
                    showAlert(
                      "Response in progress",
                      "Please wait until the response finishes before deleting chats."
                    );
                    return;
                  }
                  deleteChatSession(session.id);
                }}
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  p: 0.5,
                  "&:hover": { color: "#fff" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))
      )}

      <Divider
        sx={{
          mt: 1.5,
          borderColor: "rgba(255,255,255,0.15)",
          borderBottomWidth: "2px",
        }}
      />
    </Box>
  );
}
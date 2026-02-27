import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Paper, Divider, CircularProgress } from "@mui/material";
import { useApp } from "../../../app/providers/AppProvider";

export default function ChatHistory() {
  const { messages, selectedClient, loading } = useApp();
  const [bottomEl, setBottomEl] = useState(null);

  const formatContent = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/^\s*[\*•-]\s+/gm, "• ");
  };

  const chatTitle = useMemo(() => {
    const firstUserMsg = messages.find((m) => m.role === "user");
    if (!firstUserMsg) return "New Chat";
    return firstUserMsg.content.length > 40
      ? firstUserMsg.content.slice(0, 40) + "..."
      : firstUserMsg.content;
  }, [messages]);

  useEffect(() => {
    bottomEl?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, bottomEl, loading]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#EAE7E2",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          px: { xs: 4, md: 20, lg: 42 },
          py: 2,
          background: "transparent",
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: "white",
          }}
        >
          {selectedClient?.Client_Name || "Client"} : {chatTitle}
        </Typography>
        <Divider sx={{ mt: 1.5, borderColor: "rgba(255,255,255,0.15)" }} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          py: 3,
          px: { xs: 4, md: 20, lg: 42 },
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.25)",
            borderRadius: "10px",
          },
        }}
      >
        {messages.length === 0 && !loading && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(234,231,226,0.7)",
            }}
          >
            Ask your questions...
          </Box>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <Box
              key={m.id}
              sx={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}
            >
              {isUser ? (
                <Paper
                  sx={{
                    p: "10px 14px",
                    maxWidth: "75%",
                    borderRadius: "12px 12px 2px 12px",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography sx={{ fontSize: 14, whiteSpace: "pre-wrap" }}>
                    {m.content}
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ maxWidth: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: 1.8,
                      whiteSpace: "pre-wrap",
                      color: "#EAE7E2",
                    }}
                  >
                    {formatContent(m.content)}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}

        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "rgba(234,231,226,0.7)" }}>
            <CircularProgress size={16} thickness={5} sx={{ color: "white" }} />
            <Typography sx={{ fontSize: 13 }}>Processing…</Typography>
          </Box>
        )}

        <div ref={setBottomEl} />
      </Box>
    </Box>
  );
}
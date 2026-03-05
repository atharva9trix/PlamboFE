import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Divider, CircularProgress, GlobalStyles } from "@mui/material";
import { useApp } from "../../../app/providers/AppProvider";

export default function ChatHistory() {
  const { messages, selectedClient, loading } = useApp();
  const [bottomEl, setBottomEl] = useState(null);

  useEffect(() => {
    bottomEl?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, bottomEl]);

  const chatTitle = useMemo(() => {
    const firstUserMsg = messages.find((m) => m.role === "user");
    if (!firstUserMsg) return "New Chat";
    return firstUserMsg.content.length > 40
      ? firstUserMsg.content.slice(0, 40) + "..."
      : firstUserMsg.content;
  }, [messages]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", color: "#EAE7E2" }}>
      <GlobalStyles styles={`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@500;600&display=swap');
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `} />

      
      <Box sx={{ position: "sticky", top: 0, zIndex: 5, px: { xs: 4, md: 20, lg: 42 }, py: 2, background: "transparent" }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: "white", fontFamily: "'Inter', sans-serif !important" }}>
          {selectedClient?.Client_Name || "Client"} : {chatTitle}
        </Typography>
        <Divider sx={{ mt: 1.5, borderColor: "rgba(255,255,255,0.15)" }} />
      </Box>

    
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          py: 4,
          px: { xs: 4, md: 20, lg: 42 },
          display: "flex",
          flexDirection: "column",
          gap: 3,

         
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: "10px" },
        }}
      >

         {messages.length === 0 && !loading && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(234, 231, 226, 0.6)",
              fontSize: 16,
              fontFamily: "'Inter', sans-serif !important",
            }}
          >
            Ask your questions...
          </Box>
        )}

        {messages.map((m, index) => {
          const isUser = m.role === "user";
          const displayText = m.displayContent ?? m.content;
          const isLastAI = !isUser && index === messages.length - 1;
          const isTyping = isLastAI && loading && displayText.length > 0;

          return (
            <Box key={m.id} sx={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              <Box sx={{ maxWidth: isUser ? "80%" : "100%" }}>
                <Typography
                  sx={{
                    fontSize: isUser ? 15 : 14.2,
                    lineHeight: isUser ? 1.5 : 1.8,
                    whiteSpace: "pre-wrap",
                    fontFamily: isUser ? "'Poppins', sans-serif !important" : "'Inter', sans-serif !important",
                    fontWeight: isUser ? 500 : 400,
                    letterSpacing: isUser ? "0.2px" : "0px",
                    color: isUser ? "white" : "rgba(234, 231, 226, 0.9)",
                    background: isUser ? "rgba(255,255,255,0.08)" : "transparent",
                    p: isUser ? "10px 16px" : "0px",
                    borderRadius: isUser ? "16px 16px 4px 16px" : "0px",
                  }}
                >
                  {displayText}
                  {isTyping && (
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: "7px",
                        height: "14px",
                        bgcolor: "white",
                        ml: 0.8,
                        verticalAlign: "middle",
                        animation: "blink 1s step-end infinite",
                      }}
                    />
                  )}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {loading && (!messages[messages.length - 1]?.displayContent) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
            <CircularProgress size={13.2} sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography sx={{ fontSize: 13.2, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif !important" }}>
              Thinking...
            </Typography>
          </Box>
        )}

        <div ref={setBottomEl} />
      </Box>
    </Box>
  );
}
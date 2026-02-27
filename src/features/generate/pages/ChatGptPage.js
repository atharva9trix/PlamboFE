import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, IconButton, Divider, Skeleton } from "@mui/material";
import { useApp } from "../../../app/providers/AppProvider";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; 
import { motion } from "framer-motion";
import Background from "../../../ui/components/Background";
import ModeButtons from "../../../pages/Home/components/ModeButtons";
import { generateImage } from "../../../core/services/appService";

export default function ChatGptPage() {
  const { selectedClient } = useApp();
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDownload = (imageUrl, promptText) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    const sanitizedPrompt = promptText
      ? promptText.replace(/[^a-z0-9]/gi, "_").toLowerCase().substring(0, 30)
      : "generated-image";
    link.download = `${sanitizedPrompt}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSend = async () => {
    if (!prompt.trim() || !selectedClient) return;

    const currentPrompt = prompt;
    setMessages((prev) => [...prev, { type: "user", content: currentPrompt }]);
    setPrompt("");

    const loadingId = Date.now();
    setMessages((prev) => [...prev, { id: loadingId, type: "bot", loading: true }]);

    try {
      const imageBlob = await generateImage(selectedClient.Client_Name, currentPrompt);
      const imageUrl = URL.createObjectURL(imageBlob);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? { type: "bot", content: imageUrl, isImage: true, originalPrompt: currentPrompt }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId ? { type: "bot", content: error.message } : msg
        )
      );
    }
  };

  return (
    <Box sx={{ height: "100vh", position: "relative", display: "flex" }}>
      <Background />

      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          color: "white",
        }}
      >
        <Box sx={{ mt: 0.5, px: 45, flexShrink: 0 }}>
          <ModeButtons />
          <Divider sx={{ mt: 2, mb: 1, borderColor: "rgba(255,255,255,0.15)" }} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 45,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.3)",
              borderRadius: "10px",
            },
          }}
        >
          {messages.length === 0 && (
            <Typography sx={{ textAlign: "center", mt: 10, opacity: 0.5 }}>
              Ask something to generate an image...
            </Typography>
          )}

          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                maxWidth: "65%",
                backgroundColor: msg.type === "user" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                borderRadius: 3,
                p: 1,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
          
              {msg.loading && (
                <Box sx={{ width: 400, position: "relative", p: 1 }}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                      "&::after": {
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <AutoAwesomeIcon sx={{ fontSize: 40, color: "rgba(255,255,255,0.6)" }} />
                    </motion.div>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                      Generating Image...
                    </Typography>
                  </Box>
                </Box>
              )}

              
              {msg.isImage && (
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={msg.content}
                    alt="Generated"
                    sx={{ width: "100%", maxWidth: 400, borderRadius: 2, display: "block" }}
                  />
                  <IconButton
                    onClick={() => handleDownload(msg.content, msg.originalPrompt)}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": { background: "rgba(0,0,0,0.7)" },
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}

              {!msg.loading && !msg.isImage && <Typography sx={{ p: 1 }}>{msg.content}</Typography>}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ px: 45, pb: 2, pt: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 5,
              p: 1.2,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your prompt..."
              variant="standard"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              InputProps={{ disableUnderline: true, sx: { color: "white" } }}
            />
            <IconButton onClick={handleSend} sx={{ color: "white" }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
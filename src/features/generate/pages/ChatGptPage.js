import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useApp } from "../../../app/context/useApp";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ImageIcon from "@mui/icons-material/Image"; 
import MovieIcon from "@mui/icons-material/Movie";
import { motion } from "framer-motion";
import Background from "../../../ui/components/Background";
import ModeButtons from "../../../pages/Home/components/ModeButtons";
import { generateMedia } from "../../../core/services/appService";

export default function ChatGptPage() {
  const { selectedClient } = useApp();
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDownload = (mediaUrl, promptText) => {
    const link = document.createElement("a");
    link.href = mediaUrl;
    const sanitizedPrompt = promptText
      ? promptText.replace(/[^a-z0-9]/gi, "_").toLowerCase().substring(0, 30)
      : "generated-media";
    link.download = `${sanitizedPrompt}.${mediaType === "video" ? "mp4" : "png"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSend = async () => {
    if (!prompt.trim() || !selectedClient) return;

    const currentPrompt = prompt;
    const currentMediaType = mediaType;
    setMessages((prev) => [...prev, { type: "user", content: currentPrompt }]);
    setPrompt("");

    const loadingId = Date.now();
    setMessages((prev) => [...prev, { id: loadingId, type: "bot", loading: true, mediaType: currentMediaType }]);

    try {
      const mediaBlob = await generateMedia(selectedClient.Client_Name, currentPrompt, currentMediaType);
      const mediaUrl = URL.createObjectURL(mediaBlob);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                type: "bot",
                content: mediaUrl,
                isImage: currentMediaType === "image",
                isVideo: currentMediaType === "video",
                originalPrompt: currentPrompt,
              }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingId ? { type: "bot", content: error.message } : msg))
      );
    }
  };

  return (
    <Box sx={{ height: "100vh", position: "relative", display: "flex", overflow: "hidden" }}>
      <Background />

      <Box sx={{ flexGrow: 1, zIndex: 2, display: "flex", flexDirection: "column", height: "100vh", color: "white" }}>
        <Box sx={{ mt: 0.5, px: 45, flexShrink: 0 }}>
          <ModeButtons />
          <Divider sx={{ mt: 2, mb: 1, borderColor: "rgba(255,255,255,0.1)" }} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 45,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.1)", borderRadius: "10px" },
          }}
        >
          {messages.length === 0 && (
            <Box sx={{ textAlign: "center", mt: 15, opacity: 0.4 }}>
              <AutoAwesomeIcon sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h6">What can I create for you today?</Typography>
            </Box>
          )}

          {messages.map((msg, index) => (
            <Box key={index} sx={{ alignSelf: msg.type === "user" ? "flex-end" : "flex-start", maxWidth: "80%", position: "relative" }}>
              {msg.type === "user" ? (
                <Box sx={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)", p: 2, borderRadius: "18px 18px 2px 18px", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                  <Typography variant="body2">{msg.content}</Typography>
                </Box>
              ) : (
                <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {msg.loading ? (
                    <Box sx={{ width: 400, height: 300, position: "relative", background: "rgba(255,255,255,0.03)" }}>
                      <Skeleton variant="rectangular" width="100%" height="100%" sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
                      <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                          <AutoAwesomeIcon sx={{ fontSize: 40, color: "primary.main" }} />
                        </motion.div>
                        <Typography variant="caption" sx={{ letterSpacing: 1 }}>GENERATING {msg.mediaType?.toUpperCase()}...</Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ position: "relative", lineHeight: 0 }}>
                      {(msg.isImage || msg.isVideo) && (
                        <Box sx={{ position: "absolute", top: 0, right: 0, p: 1.5, zIndex: 3 }}>
                          <Tooltip title="Download">
                            <IconButton
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDownload(msg.content, msg.originalPrompt)}
                              sx={{ bgcolor: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", color: "white", border: "1px solid rgba(255,255,255,0.3)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      {msg.isImage && <Box component="img" src={msg.content} sx={{ width: "100%", maxWidth: 500, display: "block" }} />}
                      {msg.isVideo && <Box component="video" src={msg.content} controls sx={{ width: "100%", maxWidth: 500, display: "block" }} />}
                      {!msg.isImage && !msg.isVideo && <Typography sx={{ p: 2, bgcolor: "rgba(255,0,0,0.1)", color: "#ff8a80" }}>{msg.content}</Typography>}
                    </Box>
                  )}
                </Box>
              )}
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
              backdropFilter: "blur(20px)",
            }}
          >
            <TextField
              fullWidth
              placeholder={`Describe the ${mediaType}...`}
              variant="standard"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              InputProps={{ disableUnderline: true, sx: { color: "white", ml: 1 } }}
            />

            <ToggleButtonGroup
              value={mediaType}
              exclusive
              onChange={(e, val) => val && setMediaType(val)}
              sx={{
                mx: 1,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: "12px",
                p: "2px",
                "& .MuiToggleButton-root": {
                  color: "rgba(255,255,255,0.5)",
                  border: "none",
                  borderRadius: "10px !important",
                  px: 1.5,
                  py: 0.5,
                  fontSize: 11,
                  textTransform: "none",
                  gap: 0.8,
                  "&.Mui-selected": { color: "white", bgcolor: "rgba(255,255,255,0.15)" },
                },
              }}
            >
              <ToggleButton value="image">
                <ImageIcon sx={{ fontSize: 16 }} /> Img
              </ToggleButton>
              <ToggleButton value="video">
                <MovieIcon sx={{ fontSize: 16 }} /> Video
              </ToggleButton>
            </ToggleButtonGroup>

            <IconButton 
               onClick={handleSend} 
               disabled={!prompt.trim()}
               sx={{ color: "white", ml: 1, "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" } }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
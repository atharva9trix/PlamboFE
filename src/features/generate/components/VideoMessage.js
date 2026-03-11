import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";

export default function VideoMessage({ msg, handleDownload }) {
  return (
    <Box sx={{ position: "relative", lineHeight: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 3,
        }}
      >
        <Tooltip title="Download">
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              handleDownload(msg.content, msg.originalPrompt)
            }
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <video
        src={msg.content}
        controls
        preload="metadata"
        style={{
          width: "100%",
          maxWidth: 500,
          height: "auto",
          display: "block",
          borderRadius: "16px",
        }}
      />
    </Box>
  );
}
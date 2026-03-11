import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";
import MediaTypeMenu from "./MediaTypemenu";

export default function ChatInput({
  prompt,
  setPrompt,
  handleSend,
  mediaType,
  setMediaType,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  

  return (
    <Box sx={{ px: 45, pb: 2, pt: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.08)",
          borderRadius: 5,
          p: 1,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          height: 40,
          position: "relative",
        }}
      >
        <TextField
          fullWidth
          placeholder={`Describe the ${mediaType}...`}
          variant="standard"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          InputProps={{
            disableUnderline: true,
            sx: { color: "white", ml: 1 },
          }}
        />

        <Box
          sx={{ ml: 1, display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              px: 1.5,
              py: 0.5,
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              bgcolor:
                mediaType === "image"
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              minWidth: 70,
              justifyContent: "center",
            }}
          >
            {mediaType === "image" && (
              <ImageIcon sx={{ fontSize: 16 }} />
            )}
            {mediaType === "video" && (
              <MovieIcon sx={{ fontSize: 16 }} />
            )}
            {mediaType === "content" && (
              <ArticleIcon sx={{ fontSize: 16 }} />
            )}

            <span style={{ fontSize: 11 }}>
              {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
            </span>
          </Box>

          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.5)",
              bgcolor: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
              width: 32,
              height: 32,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </Box>

        <IconButton
          onClick={handleSend}
          disabled={!prompt.trim()}
          sx={{
            ml: 1,
            color: "white",
            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.3)",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>

      {isExpanded && (
        <MediaTypeMenu
          mediaType={mediaType}
          setMediaType={setMediaType}
          setIsExpanded={setIsExpanded}
        />
      )}
    </Box>
  );
}
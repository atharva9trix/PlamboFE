import React from "react";
import { Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";

export default function MediaTypeMenu({
  mediaType,
  setMediaType,
  setIsExpanded,
}) {
  const optionStyle = (type) => ({
    display: "flex",
    alignItems: "center",
    gap: 0.8,
    px: 1.5,
    py: 1,
    fontSize: 11,
    cursor: "pointer",
    color: mediaType === type ? "white" : "rgba(255,255,255,0.5)",
    bgcolor:
      mediaType === type
        ? "rgba(255,255,255,0.15)"
        : "transparent",
    borderRadius: "10px",
    mx: 0.5,
    my: 0.25,
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.15)",
      color: "white",
    },
  });

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 74,
        right: 440,
        zIndex: 1300,
        bgcolor: "rgba(0,0,0,0.2)",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        minWidth: 120,
        py: 0.5,
      }}
    >
      <Box
        onClick={() => {
          setMediaType("image");
          setIsExpanded(false);
        }}
        sx={optionStyle("image")}
      >
        <ImageIcon sx={{ fontSize: 16 }} />
        Image
      </Box>

      <Box
        onClick={() => {
          setMediaType("video");
          setIsExpanded(false);
        }}
        sx={optionStyle("video")}
      >
        <MovieIcon sx={{ fontSize: 16 }} />
        Video
      </Box>

      <Box
        onClick={() => {
          setMediaType("content");
          setIsExpanded(false);
        }}
        sx={optionStyle("content")}
      >
        <ArticleIcon sx={{ fontSize: 16 }} />
        Content
      </Box>
    </Box>
  );
}
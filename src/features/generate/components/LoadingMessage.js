import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";

export default function LoadingMessage({ mediaType }) {
  return (
    <Box sx={{ width: 400, height: 300, position: "relative" }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 40 }} />
        </motion.div>

        <Typography variant="caption" sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
          GENERATING {mediaType?.toUpperCase()}...
        </Typography>
      </Box>
    </Box>
  );
}
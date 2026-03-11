import React from "react";
import { Box, Typography } from "@mui/material";

export default function UserMessage({ msg }) {
  return (
    <Box sx={{ alignSelf: "flex-end", maxWidth: "80%" }}>
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
          p: 2,
          borderRadius: "18px 18px 2px 18px",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="body2">{msg.content}</Typography>
      </Box>
    </Box>
  );
}
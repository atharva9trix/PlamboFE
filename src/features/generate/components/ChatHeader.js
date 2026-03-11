import React from "react";
import { Box, Divider } from "@mui/material";
import ModeButtons from "../../../pages/Home/components/ModeButtons";

export default function ChatHeader() {
  return (
    <Box sx={{ mt: 0.5, px: 45, flexShrink: 0 }}>
      <ModeButtons />
      <Divider sx={{ mt: 2, mb: 1, borderColor: "rgba(255,255,255,0.1)" }} />
    </Box>
  );
}
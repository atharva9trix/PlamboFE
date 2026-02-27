import React from "react";
import { Box } from "@mui/material";
import Background from "../../../ui/components/Background";
import ChatHistory from "../../../pages/Home/components/ChatHistory";
import QueryInput from "../../../pages/Home/components/QueryInput";
import ModeButtons from "../../../pages/Home/components/ModeButtons";

export default function BriefPage() {

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
        }}
      >
        <Box sx={{ mt: 0.5, px: 4, flexShrink: 0 }}>
          <ModeButtons />
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", px: 4 }}>
          <ChatHistory />
        </Box>

        <Box sx={{ px: 45, pb: 1, pt: 2, flexShrink: 0 }}>
          <QueryInput />
        </Box>
      </Box>
    </Box>
  );
}
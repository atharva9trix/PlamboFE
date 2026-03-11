import React from "react";
import { Box, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

export default function MessagesContainer({
  messages,
  copiedMessageId,
  setCopiedMessageId,
  handleDownload,
  messagesEndRef,
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        px: 45,
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {messages.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 15, opacity: 0.4 }}>
          <AutoAwesomeIcon sx={{ fontSize: 50, mb: 2 }} />
          <Typography variant="h6">What can I create for you today?</Typography>
        </Box>
      )}

      {messages.map((msg, index) =>
        msg.type === "user" ? (
          <UserMessage key={index} msg={msg} />
        ) : (
          <BotMessage
            key={index}
            msg={msg}
            index={index}
            copiedMessageId={copiedMessageId}
            setCopiedMessageId={setCopiedMessageId}
            handleDownload={handleDownload}
          />
        ),
      )}

      <div ref={messagesEndRef} />
    </Box>
  );
}
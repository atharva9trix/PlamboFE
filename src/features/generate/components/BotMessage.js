import React from "react";
import { Box } from "@mui/material";
import LoadingMessage from "./LoadingMessage";
import ImageMessage from "./ImageMessage";
import VideoMessage from "./VideoMessage";
import ContentMessage from "./ContentMessage";
import ErrorMessage from "./ErrorMessage";

export default function BotMessage({
  msg,
  index,
  copiedMessageId,
  setCopiedMessageId,
  handleDownload,
}) {
  return (
    <Box sx={{ alignSelf: "flex-start", maxWidth: "80%" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {msg.loading && <LoadingMessage mediaType={msg.mediaType} />}

        {!msg.loading && msg.isImage && (
          <ImageMessage msg={msg} handleDownload={handleDownload} />
        )}

        {!msg.loading && msg.isVideo && (
          <VideoMessage msg={msg} handleDownload={handleDownload} />
        )}

        {!msg.loading && msg.isContent && (
          <ContentMessage
            msg={msg}
            index={index}
            copiedMessageId={copiedMessageId}
            setCopiedMessageId={setCopiedMessageId}
          />
        )}

        {!msg.loading && !msg.isImage && !msg.isVideo && !msg.isContent && (
          <ErrorMessage msg={msg} />
        )}
      </Box>
    </Box>
  );
}
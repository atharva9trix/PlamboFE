import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function ContentMessage({
  msg,
  index,
  copiedMessageId,
  setCopiedMessageId,
}) {
  const handleCopy = async (content) => {
    try {
      let textToCopy = `Title: ${content.title}\n\n`;
      textToCopy += `Hook: ${content.hook}\n\n`;
      textToCopy += `Script: ${content.script}\n\n`;

      if (content.caption) textToCopy += `Caption: ${content.caption}\n\n`;
      if (content.cta) textToCopy += `CTA: ${content.cta}\n\n`;

      if (content.hashtags?.length) {
        textToCopy += `Hashtags: ${content.hashtags.join(", ")}\n\n`;
      }

      if (content.scene_breakdown?.length) {
        textToCopy += `Scene Breakdown:\n`;
        content.scene_breakdown.forEach((scene) => {
          textToCopy += `Scene ${scene.scene}: ${scene.visual}\n`;
          if (scene.on_screen_text)
            textToCopy += `On Screen: ${scene.on_screen_text}\n`;
          if (scene.dialogue_or_voiceover)
            textToCopy += `Voiceover: ${scene.dialogue_or_voiceover}\n`;
        });
      }

      await navigator.clipboard.writeText(textToCopy);

      setCopiedMessageId(index);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {}
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          p: 1.5,
          zIndex: 3,
        }}
      >
        <Tooltip
          title={
            copiedMessageId === index ? "Copied" : "Copy Content"
          }
        >
          <IconButton
            onClick={() => handleCopy(msg.content)}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            {copiedMessageId === index ? (
              <CheckIcon fontSize="small" />
            ) : (
              <ContentCopyIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          p: 3,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 3,
          maxWidth: 600,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {msg.content.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Hook:</strong> {msg.content.hook}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Script:</strong> {msg.content.script}
        </Typography>

        {msg.content.caption && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Caption:</strong> {msg.content.caption}
          </Typography>
        )}

        {msg.content.cta && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>CTA:</strong> {msg.content.cta}
          </Typography>
        )}

        {msg.content.hashtags?.length > 0 && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Hashtags:</strong>{" "}
            {msg.content.hashtags.join(", ")}
          </Typography>
        )}

        {msg.content.scene_breakdown?.length > 0 && (
          <>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Scene Breakdown:
            </Typography>

            {msg.content.scene_breakdown.map((scene) => (
              <Box key={scene.scene} sx={{ mb: 2, pl: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Scene {scene.scene}: {scene.visual}
                </Typography>

                {scene.on_screen_text && (
                  <Typography variant="body2">
                    <strong>On Screen:</strong>{" "}
                    {scene.on_screen_text}
                  </Typography>
                )}

                {scene.dialogue_or_voiceover && (
                  <Typography variant="body2">
                    <strong>Dialogue/Voiceover:</strong>{" "}
                    {scene.dialogue_or_voiceover}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { useApp } from "../../../app/context/useApp";
import Background from "../../../ui/components/Background";
import { generateMedia } from "../../../core/services/appService";

import ChatHeader from "../components/ChatHeader";
import MessagesContainer from "../components/MessageContainer";
import ChatInput from "../components/ChatInput";

export default function ChatGptPage() {
  const { selectedClient } = useApp();

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const blobUrlsRef = useRef(new Map());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
      blobUrlsRef.current.clear();
    };
  }, []);

  const handleDownload = useCallback(
    (mediaUrl, promptText) => {
      const link = document.createElement("a");
      link.href = mediaUrl;

      const sanitizedPrompt = promptText
        ? promptText.replace(/[^a-z0-9]/gi, "_").toLowerCase().substring(0, 30)
        : "generated-media";

      link.download = `${sanitizedPrompt}.${mediaType === "video" ? "mp4" : "png"}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [mediaType],
  );

  const handleSend = async () => {
    if (!prompt.trim() || !selectedClient) return;

    const currentPrompt = prompt;
    const currentMediaType = mediaType;
    const loadingId = Date.now();

    setMessages((prev) => [
      ...prev,
      { type: "user", content: currentPrompt },
      { id: loadingId, type: "bot", loading: true, mediaType: currentMediaType },
    ]);

    setPrompt("");

    try {
      const response = await generateMedia(
        selectedClient.Client_Name,
        currentPrompt,
        currentMediaType,
      );

      if (currentMediaType === "content") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? { type: "bot", content: response.content, isContent: true }
              : msg,
          ),
        );
        return;
      }

      const mediaBlob = response;
      const mediaUrl = URL.createObjectURL(mediaBlob);

      blobUrlsRef.current.set(loadingId, mediaUrl);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                type: "bot",
                content: mediaUrl,
                blobUrlId: loadingId,
                isImage: currentMediaType === "image",
                isVideo: currentMediaType === "video",
                originalPrompt: currentPrompt,
              }
            : msg,
        ),
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId ? { type: "bot", content: error.message } : msg,
        ),
      );
    }
  };

  return (
    <Box sx={{ height: "100vh", position: "relative", display: "flex", overflow: "hidden" }}>
      <Background />

      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          color: "white",
        }}
      >
        <ChatHeader />

        <MessagesContainer
          messages={messages}
          copiedMessageId={copiedMessageId}
          setCopiedMessageId={setCopiedMessageId}
          handleDownload={handleDownload}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          prompt={prompt}
          setPrompt={setPrompt}
          handleSend={handleSend}
          mediaType={mediaType}
          setMediaType={setMediaType}
        />
      </Box>
    </Box>
  );
}
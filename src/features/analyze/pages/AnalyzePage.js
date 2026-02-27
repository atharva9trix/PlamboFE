import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../app/providers/AppProvider";
import { useAuth } from "../../../app/context/AuthContext";
import {
  fetchSchema,
  updateFileAttribute,
  runQuery,
  getInsights,
  createSession,
} from "../../../core/services/appService";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import ModeButtons from "../../../pages/Home/components/ModeButtons";
import "../../../App.css";

export default function AnalyzePage() {
  const { setActiveMode, sessionId, selectedClient, setSessionId } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi — upload a file using the + button, then ask me to show a table, visualize a column, or query the data.",
    },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [chatStage, setChatStage] = useState("welcome");
  const [isTyping, setIsTyping] = useState(false);
  const [isSchemaConfirmed, setIsSchemaConfirmed] = useState(false);
  const userId = selectedClient?.Id || 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!sessionId) navigate("/");
  }, [sessionId, navigate]);

  useEffect(() => {
    return () => setActiveMode(null);
  }, [setActiveMode]);

  const pushMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleNewChat = async () => {
    try {
      const sessionData = await createSession(userId);
      setSessionId(sessionData.session_id);
      setMessages([
        {
          role: "assistant",
          text: "Hi — upload a file using the + button, then ask me to show a table, visualize a column, or query the data.",
        },
      ]);
      setUploadedFiles([]);
      setFile(null);
      setFileName("");
      setSchema(null);
      setChatStage("welcome");
      setIsSchemaConfirmed(false);
    } catch {}
  };

  const handleFileUpload = async (rows, filename, fileObj) => {
    if (!fileObj) return;
    setFile(fileObj);
    setFileName(fileObj.name.replace(/\.[^/.]+$/, ""));
    setLoading(true);
    setChatStage("fileUploaded");
    pushMessage({ role: "assistant", text: ` ${filename} uploading....! ` });

    try {
      let schemaData = await fetchSchema(fileObj, userId, sessionId);
      if (
        Array.isArray(schemaData) &&
        schemaData[0]?.includes?.("file is already present")
      ) {
        schemaData = await updateFileAttribute(fileObj, userId, sessionId);
      }

      const schemaArray = schemaData.success?.[0]?.Data_Types
        ? Object.entries(schemaData.success[0].Data_Types).map(
            ([name, type]) => ({
              name,
              type,
              originalName: name,
              detectedType: type,
            }),
          )
        : [];

      setSchema(schemaArray);
      setUploadedFiles((prev) => [...prev, fileObj.name]);
      pushMessage({ role: "user", text: `Uploaded file: ${fileObj.name}` });
      pushMessage({
        role: "assistant",
        text: `File "${fileObj.name}" uploaded.`,
        meta: {
          schema: { columns: schemaArray },
          userSessionFileId: sessionId,
          fileName: fileObj.name.replace(/\.[^/.]+$/, ""),
        },
      });
    } catch (err) {
      pushMessage({ role: "assistant", text: `Error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleSchemaUpdate = (updatedSchema) => {
    setSchema(updatedSchema.columns);
    setIsSchemaConfirmed(true);
    setChatStage("schemaConfirmed");
    pushMessage({
      role: "assistant",
      text: "Schema confirmed. Ask your question now.",
    });
  };

  const handleSendQuery = async (text) => {
    if (!text.trim() || !file) return;
    setLoading(true);
    pushMessage({ role: "user", text });
    setIsTyping(true);

    try {
      const queryResponse = await runQuery(fileName, userId, sessionId, text);
      if (!queryResponse?.success) {
        pushMessage({
          role: "assistant",
          text: "I didn’t get a proper response. Try asking differently.",
        });
        return;
      }

      const insights = await getInsights(queryResponse);
      const meta = {
        preface: queryResponse.preface,
        title: queryResponse.Title,
        xAxis: queryResponse["X-axis"],
        yAxis: queryResponse["Y-axis"],
        data: queryResponse.success,
        insights,
        charts: queryResponse.Possible_charts || [],
        table: queryResponse.success,
      };

      pushMessage({
        role: "assistant",
        text: meta.title || "Query Results",
        meta,
      });
    } catch {
      pushMessage({
        role: "assistant",
        text: "Sorry, something went wrong while fetching the data.",
      });
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        color: "white",
        fontFamily: "Inter, sans-serif",
        background: "transparent",
      }}
    >
      <Box
        sx={{
          width: 200,
          p: 3,
          pt: 51,
          display: "flex",
          flexDirection: "column",
          background: "transparent",
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 1,
            color: "rgba(234,231,226,0.45)",
          }}
        >
          Your chats
        </Typography>
        <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
          {uploadedFiles.length === 0 ? (
            <Typography sx={{ fontSize: 13, color: "rgba(234,231,226,0.45)" }}>
              No files yet
            </Typography>
          ) : (
            uploadedFiles.map((fn, idx) => (
              <ListItem
                key={idx}
                sx={{
                  pl: 2,
                  ml: -1,
                  py: 0.6,
                  borderRadius: 1,
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <ListItemText
                  primary={fn}
                  primaryTypographyProps={{
                    sx: { fontSize: 13, color: "rgba(234,231,226,0.85)" },
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>

      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        <Box sx={{ mt: 1, pr: 4, pl: 2, flexShrink: 0 }}>
          <ModeButtons />
        </Box>

        <Box
          sx={{
            flex: 1,
            pr: 4,
            pl: 2,
            mt: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              borderRadius: "16px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
              Business Intelligence
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />}
                onClick={handleNewChat}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                  fontSize: "0.85rem",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                New Chat
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              mt: 1,
              borderRadius: "20px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              pt: 2,
              mb: 1,
            }}
          >
            <Box
              ref={scrollRef}
              sx={{
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "3px",
                },
              }}
            >
              <MessageList
                messages={messages}
                onSchemaUpdate={handleSchemaUpdate}
                darkMode
              />
              {isTyping && (
                <Box
                  sx={{
                    p: 2,
                    color: "rgba(255,255,255,0.5)",
                    fontStyle: "italic",
                  }}
                >
                  Thinking...
                </Box>
              )}
            </Box>
            <Box
              sx={{ pt: 1, px: 1, background: "transparent", flexShrink: 0 }}
            >
              <ChatInput
                onSend={handleSendQuery}
                onUpload={handleFileUpload}
                isFileUploaded={!!file}
                rows={schema}
                chatStage={chatStage}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

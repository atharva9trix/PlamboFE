import { Box, TextField, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";
import { useApp } from "../../../app/context/useApp";

export default function QueryInput() {
  const [input, setInput] = useState("");
  const { selectedClient, sendQuery, isGenerating } = useApp();

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendQuery(selectedClient, input.trim());
    setInput("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "24px",
          px: 2,
          py: 0.5,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "background 0.3s ease",
          "&:hover": {
            background: "rgba(255,255,255,0.25)",
          },
        }}
      >
        <TextField
          fullWidth
          multiline
          variant="standard"
          value={input}
          disabled={!selectedClient || isGenerating}
          placeholder={
            selectedClient ? "Type your message..." : "Select a client first"
          }
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& textarea": {
              padding: "10px 0px",
              color: "rgba(255,255,255,0.85)",
              fontSize: 15,
              fontFamily: "'Poppins', sans-serif !important", 
              letterSpacing: "0.2px",
            },
          }}
        />

        <IconButton
          sx={{
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <MicNoneIcon />
        </IconButton>

        <IconButton
          onClick={handleSend}
          disabled={!input.trim() || isGenerating}
          sx={{
            color: "white",
            px: 2,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
          }}
        >
          {isGenerating ? (
            <CircularProgress
              size={20}
              sx={{ color: "white", "& .MuiCircularProgress-svg": { stroke: "white !important" } }}
            />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
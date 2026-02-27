import React, { useState, useRef } from "react";
import { Box, TextField, IconButton, Tooltip, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { MAX_FILE_SIZE_MB, SUPPORTED_TYPES } from "../../../core/constants/validateFile";

export default function ChatInput({ onSend, onUpload, onFocus, loading = false }) {
  const [value, setValue] = useState("");
  const [fileError, setFileError] = useState("");
  const inputRef = useRef();

  const submit = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;

    setFileError("");
    const ext = `.${file.name.split(".").pop().toLowerCase()}`;
    if (!SUPPORTED_TYPES.includes(ext)) {
      setFileError("Unsupported file type. Only CSV, XLSX, Parquet allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    onFocus?.();
    try {
      onUpload?.([], file.name, file);
      inputRef.current.value = "";
    } catch {
      setFileError("Failed to parse file.");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mx: "auto", mb: 2 }}>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept={SUPPORTED_TYPES.join(",")}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <Tooltip title={fileError || "Upload CSV, XLSX or Parquet"}>
        <IconButton
          onClick={() => {
            onFocus?.();
            inputRef.current.click();
          }}
          sx={{ color: "rgba(255,255,255,0.7)", backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "24px",
          px: 2,
          py: 0.5,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          multiline
          variant="standard"
          value={value}
          disabled={loading}
          placeholder="Upload a file & ask: show table, visualize column..."
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => onFocus?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          InputProps={{ disableUnderline: true }}
          sx={{ "& textarea": { padding: "10px 0px", color: "white", fontSize: 14 } }}
        />
      </Box>

      <IconButton
        onClick={submit}
        disabled={!value.trim() || loading}
        sx={{
          color: "white",
          px: 2,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
          "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
        }}
      >
        {loading ? (
          <CircularProgress
            size={20}
            sx={{ color: "white", "& .MuiCircularProgress-svg": { stroke: "white !important" } }}
          />
        ) : (
          <SendIcon />
        )}
      </IconButton>
    </Box>
  );
}
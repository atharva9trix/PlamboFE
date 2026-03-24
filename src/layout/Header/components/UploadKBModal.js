import {
  Dialog,
  Box,
  Typography,
  Button,
  Slide,
} from "@mui/material";
import { forwardRef, useState } from "react";

const SlideDown = forwardRef(function SlideDown(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UploadKnowledgeBaseModal({
  open,
  onClose,
  onUpload,
  loading = false,
}) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    await onUpload(file);
    setFile(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideDown}
      BackdropProps={{
        sx: {
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
        },
      }}
      PaperProps={{
        sx: {
          width: "420px",
          maxWidth: "90vw",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          color: "white",
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            mb: 1,
            color: "#ececf1",
          }}
        >
          Upload Knowledge Base
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "rgba(234,231,226,0.6)",
            mb: 3,
          }}
        >
          Select a file to upload
        </Typography>

      
        <Box
          sx={{
            mb: 4,
            borderRadius: "12px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            p: 2,
            cursor: "pointer",
            transition: "all 0.25s ease",
            "&:hover": {
              borderColor: "#a855f7",
            },
            "&:focus-within": {
              borderColor: "#d946ef",
            },
          }}
        >
          <input
            type="file"
            id="kb-upload"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="kb-upload" style={{ cursor: "pointer", width: "100%" }}>
            <Typography
              sx={{
                fontSize: 14,
                color: file ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              {file ? file.name : "Click to select file"}
            </Typography>
          </label>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            onClick={onClose}
            sx={{
              px: 3,
              py: 1,
              background: "transparent",
              color: "#a0aec0",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "10px",
              fontWeight: 500,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleUpload}
            sx={{
              px: 3,
              py: 1,
              background: "linear-gradient(135deg, #a855f7, #d946ef)",
              color: "white",
              borderRadius: "10px",
              fontWeight: 600,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 18px rgba(168, 85, 247, 0.6)",
              },
              "&.Mui-disabled": {
                background: "rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.5)",
              },
            }}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
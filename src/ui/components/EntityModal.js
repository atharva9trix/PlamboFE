import {
  Dialog,
  Box,
  Typography,
  Button,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";

const SlideDown = forwardRef(function SlideDown(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CreateEntityModal({
  open,
  onClose,
  title,
  placeholder,
  onSubmit,
  loading = false,
}) {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!value.trim()) return;
    await onSubmit(value.trim());
    setValue("");
    onClose();
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
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "rgba(234,231,226,0.6)",
            mb: 3,
          }}
        >
          Enter details below to continue
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          sx={{
            mb: 4,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              background: "rgba(255,255,255,0.08)",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&:hover fieldset": {
                borderColor: "#a855f7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#d946ef",
              },
            },
          }}
        />

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
            onClick={handleSubmit}
            disabled={loading}
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
            {loading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
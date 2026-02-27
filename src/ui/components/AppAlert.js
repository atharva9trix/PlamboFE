import { Dialog, Box, Typography, Button, Slide } from "@mui/material";
import { forwardRef, useState, useMemo } from "react";
import comingSoonGif from "../../assets/coming-soon-ezgif.com-gif-maker.gif";

const SlideDown = forwardRef(function SlideDown(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AppAlert({
  open,
  onClose,
  title,
  message,
  isComingSoon = false,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  const [gifLoaded, setGifLoaded] = useState(true);

  const isConfirmMode = useMemo(
    () => typeof onConfirm === "function" && typeof onCancel === "function",
    [onConfirm, onCancel]
  );

  const closeAlert = () => onClose?.();

  const handleConfirm = () => {
    onConfirm?.();
    closeAlert();
  };

  const handleCancel = () => {
    onCancel?.();
    closeAlert();
  };

  return (
    <Dialog
      open={open}
      onClose={closeAlert}
      TransitionComponent={SlideDown}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      BackdropProps={{
        sx: {
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(5px)",
        },
      }}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: "90vw",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "24px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          color: "white",
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ p: 4, textAlign: "center" }}>
        {isComingSoon && gifLoaded && (
          <Box
            component="img"
            src={comingSoonGif}
            alt="Coming Soon"
            onError={() => setGifLoaded(false)}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto 20px",
              borderRadius: "50%",
            }}
          />
        )}

        {isComingSoon && !gifLoaded && (
          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
            Coming Soon
          </Typography>
        )}

        <Typography sx={{ fontSize: 24, fontWeight: 600, mb: 1.5 }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#cbd5e1",
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>

        {isConfirmMode ? (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              onClick={handleCancel}
              sx={{
                px: 3,
                py: 1,
                background: "transparent",
                color: "#cbd5e1",
                border: "1px solid #cbd5e1",
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  background: "rgba(203, 213, 225, 0.1)",
                },
              }}
            >
              {cancelText}
            </Button>

            <Button
              onClick={handleConfirm}
              sx={{
                px: 3,
                py: 1,
                background: "linear-gradient(135deg, #a855f7, #d946ef)",
                color: "white",
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(168, 85, 247, 0.6)",
                },
              }}
            >
              {confirmText}
            </Button>
          </Box>
        ) : (
          <Button
            onClick={closeAlert}
            sx={{
              px: 4,
              py: 1,
              background: "linear-gradient(135deg, #a855f7, #d946ef)",
              color: "white",
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(168, 85, 247, 0.6)",
              },
            }}
          >
            Got it
          </Button>
        )}
      </Box>
    </Dialog>
  );
}
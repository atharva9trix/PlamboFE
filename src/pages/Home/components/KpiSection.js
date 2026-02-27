import { Box, Typography, LinearProgress, CircularProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function KpiSection() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        color: "white",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
        <Typography
          sx={{
            px: 2,
            fontSize: 11,
            letterSpacing: 2,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Performance
        </Typography>
        <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 6 }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, opacity: 0.75 }}>
            <SignalCellularAltIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 12 }}>Growth Goal</Typography>
          </Box>
          <Typography sx={{ fontSize: 22, fontWeight: 500, mt: 0.5 }}>52%</Typography>
          <LinearProgress
            variant="determinate"
            value={52}
            sx={{
              mt: 1,
              width: "120px",
              height: 6,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.08)",
              "& .MuiLinearProgress-bar": { bgcolor: "white" },
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 12, opacity: 0.75 }}>ROAS</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>0.89</Typography>
            <TrendingDownIcon sx={{ fontSize: 16, color: "#d4af37" }} />
          </Box>
          <Box sx={{ height: 24, mt: 1 }}>
            <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path
                d="M0 20 L10 18 L20 22 L30 12 L40 16 L50 8 L60 20 L70 16 L80 22 L90 18 L100 20"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1"
              />
            </svg>
          </Box>
        </Box>

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={70}
              size={44}
              thickness={3}
              sx={{ color: "rgba(255,255,255,0.6)" }}
            />
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>27k</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 11, mt: 1, opacity: 0.6 }}>CRM List</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 12, opacity: 0.75 }}>Daily Mentions</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>342</Typography>
            <TrendingUpIcon sx={{ fontSize: 16, color: "#4caf50" }} />
          </Box>
          <Box sx={{ height: 24, mt: 1 }}>
            <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path
                d="M0 20 L15 10 L30 18 L45 5 L60 15 L75 9 L100 3"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1"
              />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUp";
import BarChart from "@mui/icons-material/BarChart";
import MonetizationOn from "@mui/icons-material/MonetizationOn";
import Person from "@mui/icons-material/Person";
import Speed from "@mui/icons-material/Speed";
import { fadeIn } from "../../../core/constants/fadeIn";

const KpiCard = ({ title, value, trend, colorIndex = 0, darkMode }) => {
  const accentColors = ["#6366f1", "#ef4444", "#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
  const accent = accentColors[colorIndex % accentColors.length];

  const getIcon = () => {
    const iconMap = {
      salary: <MonetizationOn />,
      sales: <TrendingUp />,
      profit: <BarChart />,
      users: <Person />,
      speed: <Speed />,
    };
    const lowerTitle = title?.toLowerCase() || "";
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerTitle.includes(key)) return icon;
    }
    return <BarChart />;
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "fit-content", 
        minWidth: 140,
        mb: 1,
        mr: 1,
        display: "inline-block", 
        bgcolor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"}`,
        borderRadius: 2.5,
        color: darkMode ? "#f1f5f9" : "#1e293b",
        transition: "transform 0.2s ease",
        animation: `${fadeIn} 0.6s ease-out`,
        "&:hover": {
          bgcolor: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              p: 0.5,
              display: "flex",
              bgcolor: `${accent}15`, 
              color: accent,
              borderRadius: 1,
            }}
          >
            {React.cloneElement(getIcon(), { sx: { fontSize: 16 } })}
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 700, 
              fontSize: "0.65rem",
              textTransform: "uppercase", 
              whiteSpace: "nowrap",
              opacity: 0.6 
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: "1.25rem",
              whiteSpace: "nowrap" 
            }}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </Typography>

          {trend && (
            <Typography 
              sx={{ 
                fontSize: "0.7rem",
                fontWeight: 700, 
                color: trend.toString().includes("-") ? "#ef4444" : "#10b981",
              }}
            >
              {trend}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
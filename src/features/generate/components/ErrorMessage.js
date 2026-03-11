import React from "react";
import { Typography } from "@mui/material";

export default function ErrorMessage({ msg }) {
  return (
    <Typography
      sx={{
        p: 2,
        bgcolor: "rgba(255,0,0,0.1)",
        color: "#ff8a80",
      }}
    >
      {msg.content}
    </Typography>
  );
}
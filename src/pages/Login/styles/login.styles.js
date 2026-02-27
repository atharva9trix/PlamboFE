export const inputStyles = {
  mb: 3,
  "& .MuiFilledInput-root": {
    backgroundColor:
      "rgba(255,255,255,0.05)",
    borderRadius: "14px",
    color: "white",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },
    "&.Mui-focused": {
      backgroundColor:
        "rgba(255,255,255,0.1)",
      border:
        "1px solid rgba(33,203,243,0.5)",
    },
  },
  "& .MuiInputLabel-root": {
    color:
      "rgba(255,255,255,0.4)",
  },
  "& .MuiInputLabel-root.Mui-focused":
    {
      color: "#21cbf3",
    },
};
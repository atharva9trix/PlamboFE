const inputStyle = {
  "& .MuiInputBase-root": {
    fontSize: 14,
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    fontSize: 14,
    color: "#ccc",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#90caf9",
    },
  },
};

export default inputStyle;
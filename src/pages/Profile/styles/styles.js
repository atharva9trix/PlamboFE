 const textFieldStyle = {
    mb: 2,
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      background: "rgba(255,255,255,0.05)",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#fbf3f3",
      },
      "&:hover fieldset": {
        borderColor: "#ebe5e5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#9b8a8a",
      },
    },
  };

export default textFieldStyle;
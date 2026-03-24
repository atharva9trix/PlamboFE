import React from "react";
import { TextField, Box } from "@mui/material";

const DynamicSearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <TextField
        label={placeholder}
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            color: "#fff",
            fontSize: 14,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
          },
          "& .MuiInputLabel-root": {
            color: "#ccc",
            fontSize: 14,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.3)",
            },
            "&:hover fieldset": {
              borderColor: "#fff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#d5cbd7", 
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default DynamicSearchBar;
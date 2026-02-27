import { Box, GlobalStyles } from "@mui/material";
import Background from "../../../ui/components/Background";

export default function AuthLayout({ header, children }) {
  return (
    <>
  
      <GlobalStyles
        styles={{
          "input:-webkit-autofill": {
            WebkitBoxShadow:
              "0 0 0 1000px transparent inset !important",
            WebkitTextFillColor: "#ffffff !important",
            caretColor: "#ffffff",
            transition:
              "background-color 9999s ease-in-out 0s",
          },
        }}
      />

      <Box
        sx={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "#000",
          px: 3,
        }}
      >
        <Background />

        <Box sx={{ zIndex: 2, textAlign: "center", mb: 4 }}>
          {header}
        </Box>

        <Box sx={{ zIndex: 2 }}>{children}</Box>
      </Box>
    </>
  );
}
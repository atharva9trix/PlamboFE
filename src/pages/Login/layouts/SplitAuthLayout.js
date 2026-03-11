import { Box, GlobalStyles, Container } from "@mui/material";
import Background from "../../../ui/components/Background";

export default function SplitAuthLayout({ header, children }) {
  return (
    <>
      <GlobalStyles
        styles={{
          "input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
            WebkitTextFillColor: "#ffffff !important",
            caretColor: "#ffffff",
            transition: "background-color 9999s ease-in-out 0s",
          },
        }}
      />

      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "#020617",
        }}
      >
        <Background />

        <Container maxWidth="lg" sx={{ zIndex: 3, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              maxWidth: "940px",
              minHeight: "500px",
              borderRadius: "28px",
              overflow: "hidden",
              bgcolor: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(20px) saturate(160%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.4)",
            }}
          >
          
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                position: "relative",
              
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                {header}
              </Box>
              
        
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "80%",
                  background: "radial-gradient(circle at 20% 30%, rgba(0,188,212,0.1) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
            </Box>

           
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py:3,
                bgcolor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "360px" }}>
                {children}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
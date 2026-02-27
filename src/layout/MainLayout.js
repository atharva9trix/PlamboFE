import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Box } from "@mui/material";
import Background from "../ui/components/Background";

export default function MainLayout({ children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        color: "white",
      }}
    >
      <Background />

      <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
        <Header />
      </Box>

      <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
        {children}
      </Box>

      <Box sx={{ position: "absolute", bottom: 0, left: 0, zIndex: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
}

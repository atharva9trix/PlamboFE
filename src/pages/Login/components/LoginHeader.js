import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

export default function LoginHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box textAlign="center">
        <motion.img
          src={logo}
          alt="Logo"
          style={{
            width: 190,
            marginBottom: "-0.5rem",
            filter: "drop-shadow(0 10px 30px rgba(33,150,243,0.3))",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: "1.4rem",
            letterSpacing: "-0.02em",
            mb: 0.5,
            mt: -5,
          }}
        >
          Performance Branding Platform
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.5)",
            fontWeight: 300,
          }}
        >
          Precision insights for modern teams.
        </Typography>
      </Box>
    </motion.div>
  );
}
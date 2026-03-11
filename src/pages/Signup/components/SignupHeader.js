import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

export default function SignupHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Box textAlign="center" sx={{ px: 2 }}>
       
        <motion.img
          src={logo}
          alt="Logo"
          style={{
            width: 160, 
            marginBottom: "0.75rem",
            filter: "drop-shadow(0 8px 25px rgba(33,150,243,0.4))",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      
        <Typography
          sx={{
            fontSize: "1.5rem", 
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            mb: 1,
            background: "linear-gradient(90deg, #64b5f6, #4dd0e1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Performance Branding Platform
        </Typography>

    
        <Typography
          sx={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.85rem", 
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 280,
            margin: "0 auto",
          }}
        >
          Build powerful brand experiences and scale your digital presence.
        </Typography>
      </Box>
    </motion.div>
  );
}
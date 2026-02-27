import { Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function LoginCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.03)",
          borderRadius: "32px",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.5)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              "0 60px 140px rgba(0,0,0,0.6)",
          },
        }}
      >
        {children}
      </Paper>
    </motion.div>
  );
}
import { Box, Typography, Grid, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Background from "./Background";
import ModeButtons from "../../pages/Home/components/ModeButtons";

export default function ToolsGridView({
  title = "Let's connect.",
  tools = [],
  onToolClick,
  activeIframe,
  setActiveIframe,
}) {
  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Background />

      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
     
        <Box
          sx={{
            mt: 0.5,
            pl: 62,
            pr: 4,
            flexShrink: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ModeButtons />

         
          {activeIframe && (
            <IconButton
              onClick={() => setActiveIframe(null)}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>

      
        <Box
          sx={{
            flexGrow: 1,
            pl: activeIframe ? 30 : 10,
            pr: 4,
            my: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: activeIframe ? "hidden" : "auto",

            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
            },
          }}
        >
          {!activeIframe ? (
            <Box sx={{ width: "100%", textAlign: "center", pt: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  mb: 6,
                  fontWeight: 300,
                  letterSpacing: "1px",
                }}
              >
                {title}
              </Typography>

              <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{ maxWidth: 520, margin: "0 auto" }}
              >
                {tools.map((tool) => (
                  <Grid
                    item
                    key={tool.name}
                    sx={{
                      width: 150,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Paper
                      onClick={() => onToolClick && onToolClick(tool)}
                      sx={{
                        width: 150,
                        height: 148,
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "28px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: onToolClick ? "pointer" : "default",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.1)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={tool.icon}
                        alt={tool.name}
                        sx={{
                          width: 190,
                          height: 69,
                          mb: 1.5,
                          objectFit: "contain",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "0.85rem",
                          opacity: 0.75,
                        }}
                      >
                        {tool.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#020617",
              }}
            >
              <iframe
                title="Canva"
                src={activeIframe}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

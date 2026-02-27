import React from "react"; 
import { Box, Typography, Grid, Paper, Divider, Stack } from "@mui/material";
import ModeButtons from "../../../pages/Home/components/ModeButtons";

export default function ProjectViewPage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "sticky" }}>
        <ModeButtons />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pl: 35,
          pr: 10,
          py: 4,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: 10,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}>
          <Box sx={{ maxWidth: "72%" }}>
            <Typography
              sx={{
                fontSize: 12,
                opacity: 0.5,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Concept:
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 300, my: 2, fontFamily: "serif" }}
            >
              “Dinner by the Creek”
            </Typography>

            <Typography sx={{ opacity: 0.8, fontSize: 14, mb: 3, lineHeight: 1.7 }}>
              Every “home chef” struggles with dinner decision fatigue — the quiet, daily stress of figuring out how to make dinner special.
            </Typography>

            <Typography sx={{ opacity: 0.8, fontSize: 14, mb: 3, lineHeight: 1.7 }}>
              “Dinner by the Creek” is about taking the pressure out of mealtime. The campaign leads with the result: a finished, tasty, flavor-forward meal the family will love and the line <strong>“Dinner. Done.”</strong>, making the benefit clear immediately.
            </Typography>

            <Typography sx={{ opacity: 0.8, fontSize: 14, mb: 3, lineHeight: 1.7 }}>
              Across every channel, the work is bold, clear, and confident. Appetite appeal is always present. The message is simple: dinner doesn’t need explaining, fixing, or dramatizing.
            </Typography>

            <Typography sx={{ opacity: 0.8, fontSize: 14, lineHeight: 1.7 }}>
              This idea positions the brand as the secret weapon. Dinner is handled, so the rest of the moment can be enjoyed.
            </Typography>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Box sx={{ width: 85, height: 85, bgcolor: "#8b0000", borderRadius: 1, border: "1px solid rgba(255,255,255,0.1)" }} />
              <Box sx={{ width: 85, height: 85, bgcolor: "#e67e22", borderRadius: 1, border: "1px solid rgba(255,255,255,0.1)" }} />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Box sx={{ width: 85, height: 85, bgcolor: "#333", borderRadius: 1, border: "1px solid rgba(255,255,255,0.1)" }} />
              <Box sx={{ width: 85, height: 85, bgcolor: "#333", borderRadius: 1, border: "1px solid rgba(255,255,255,0.1)" }} />
            </Stack>
            <Typography sx={{ fontSize: 12, opacity: 0.4, mt: 1, textAlign: "right", cursor: "pointer" }}>
              + add ref
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 5 }} />

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>Activations</Typography>
          <Typography sx={{ ml: 2, opacity: 0.4, fontSize: 14, cursor: "pointer" }}>+ new activation</Typography>
        </Box>

        <Grid container spacing={3}>
          <ActivationCard title="TikTok In-Feed (3)" items={["6-15s optimal", "Hook must be visual", "Text on screen required"]} footer="Concepts must feel discovered, not produced." />
          <ActivationCard title="Walmart Retail :15" items={["Muted autoplay", "Product clarity > story arc"]} />
          <ActivationCard title="Media Outreach / Earned Narrative" items={["Editors want a timely, human tension", "Story must connect to a broader behavior or moment", "Brand appears as a response, not the headline"]} />
          <ActivationCard title="Out-of-Home Digital" items={["2-3s glance time", "No audio", "Message must read instantly"]} footer="Design for recognition, not explanation." />
          <ActivationCard title="CTV (Streaming)" items={["Sound-on environment", "Lean-back viewing", "Longer attention window"]} footer="Story can breathe, but opening must still engage." />
          <ActivationCard title="Instagram Reels (3)" items={["5-12s optimal", "First frame must move", "Native, unpolished feel required"]} footer="Concepts must feel discovered, not produced." />
        </Grid>
      </Box>
    </Box>
  );
}

function ActivationCard({ title, items, footer }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        sx={{
          p: 3,
          minHeight: 260,
          bgcolor: "white",
          color: "black",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 15, mb: 2 }}>{title}</Typography>
        <Box component="ul" sx={{ p: 0, m: 0, pl: 2, flexGrow: 1, "& li": { mb: 1, fontSize: 13, lineHeight: 1.4 } }}>
          {items.map((text, i) => <li key={i}>{text}</li>)}
        </Box>
        {footer && (
          <Typography sx={{ mt: 2, fontSize: 12, color: "rgba(0,0,0,0.5)", fontStyle: "italic", lineHeight: 1.4 }}>
            {footer}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}
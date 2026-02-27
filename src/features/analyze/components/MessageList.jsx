import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Snackbar,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import DynamicChartViewer from "./DynamicChartViewer";
import DownloadIcon from "@mui/icons-material/Download";
import { Lightbulb } from "@mui/icons-material";
import { fadeIn } from "../../../core/constants/fadeIn";
import { CHART_TYPES } from "../../../core/constants/chartTypes";
import KpiCard from "./KpiCard";
import SchemaEditor from "./SchemaEditor";

const MessageList = ({ messages, onSchemaUpdate, darkMode }) => {
  const ref = useRef();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const glassBorder = darkMode
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(0, 0, 0, 0.08)";
  const glassBg = darkMode
    ? "rgba(255, 255, 255, 0.03)"
    : "rgba(0, 0, 0, 0.02)";
  const textColor = darkMode ? "#cbd5e1" : "#475569";

  return (
    <Box
      ref={ref}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 7,
      }}
    >
      {messages.map((m, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "flex-end",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            animation: `${fadeIn} 0.5s ease-out`,
          }}
        >
          {m.role === "assistant" && (
            <Avatar
              sx={{ bgcolor: "#0b74ff", width: 32, height: 32, color: "white" }}
            >
              T
            </Avatar>
          )}

          <Box
            sx={{
              maxWidth:
                m.role === "assistant" ? "95%" : { xs: "100%", sm: "75%" },
              display: "inline-block",
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "20px",
                bgcolor:
                  m.role === "user" ? "#0b74ff" : "rgba(255,255,255,0.05)",
                color: m.role === "user" ? "#fff" : "inherit",
                whiteSpace: "pre-line",
                width: "fit-content",
                maxWidth: "100%",
                border:
                  m.role === "assistant" ? `1px solid ${glassBorder}` : "none",
              }}
            >
              {m.meta?.preface && (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 13,
                    mb: 1,
                    color: darkMode ? "#38bdf8" : "#0369a1",
                  }}
                >
                  {`Yes, Got it — ${m.meta.preface}`}
                </Typography>
              )}

              {(!m.meta?.charts || m.meta.charts.length === 0) && (
                <Typography sx={{ fontSize: 14, lineHeight: 1.5 }}>
                  {m.text}
                </Typography>
              )}

              {m.meta?.charts && m.meta.charts.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    gap: 3,
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    {m.meta.charts.some(
                      (c) => c.toLowerCase() === "kpi card",
                    ) && (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {m.meta.data?.map((item, i) => {
                          const key = Object.keys(item)[0];
                          return (
                            <KpiCard
                              key={i}
                              title={item.title || key}
                              value={item.value ?? item[key]}
                              trend={item.trend}
                              colorIndex={i}
                              darkMode={darkMode}
                            />
                          );
                        })}
                      </Box>
                    )}

                    {m.meta.charts.filter((c) =>
                      CHART_TYPES.includes(c.toLowerCase()),
                    ).length > 0 && (
                      <DynamicChartViewer
                        possibleCharts={m.meta.charts}
                        data={m.meta.data}
                        xAxis={m.meta.xAxis}
                        yAxis={m.meta.yAxis}
                        title={m.meta.title}
                        darkMode={darkMode}
                      />
                    )}
                  </Box>

                  {m.meta?.insights && (
                    <Paper
                      elevation={0}
                      sx={{
                        flex: 0.8,
                        p: 2.5,
                        borderRadius: 3,
                        bgcolor: glassBg,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${glassBorder}`,
                        minWidth: 280,
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: darkMode ? "#fff" : "#1e293b",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        <Lightbulb sx={{ fontSize: 18, color: "#fff" }} />
                        Insights Summary
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {m.meta.insights
                          .split(/(?:\r?\n)+/)
                          .map((p) => p.trim())
                          .filter(Boolean)
                          .map((point, i) => (
                            <Typography
                              key={i}
                              sx={{
                                color: textColor,
                                fontSize: 13,
                                lineHeight: 1.6,
                              }}
                            >
                              {point}
                            </Typography>
                          ))}
                      </Box>
                    </Paper>
                  )}
                </Box>
              )}
            </Box>

            {m.meta?.schema && !m.meta?.hideSchemaEditor && (
              <SchemaEditor
                schema={m.meta.schema}
                userSessionFileId={m.meta.userSessionFileId}
                fileName={m.meta.fileName}
                onConfirm={onSchemaUpdate}
                darkMode={darkMode}
              />
            )}

            {m.meta?.summary && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mt: 2,
                  borderRadius: 2,
                  bgcolor: glassBg,
                  border: `1px solid ${glassBorder}`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: textColor,
                    whiteSpace: "pre-line",
                    fontSize: 13,
                  }}
                >
                  {m.meta.summary}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    borderColor: glassBorder,
                    color: textColor,
                    "&:hover": {
                      borderColor: "#4f46e5",
                      bgcolor: "rgba(79, 70, 229, 0.05)",
                    },
                  }}
                  onClick={() => {
                    const blob = new Blob([m.meta.summary], {
                      type: "text/plain",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "dataset_report.txt";
                    a.click();
                  }}
                >
                  Download Full Report
                </Button>
              </Paper>
            )}
          </Box>

          {m.role === "user" && (
            <Avatar sx={{ bgcolor: "#6366f1", width: 32, height: 32 }}></Avatar>
          )}
        </Box>
      ))}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default MessageList;

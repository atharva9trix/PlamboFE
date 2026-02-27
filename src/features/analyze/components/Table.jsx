import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function SimpleTable({ data = [], darkMode = false, title }) {
  if (!data || data.length === 0)
    return <Typography align="center" sx={{ py: 3, color: "gray" }}>No data available</Typography>;

  const keys = Object.keys(data[0]);

  
  const palette = darkMode
    ? {
        text: "#f1f5f9",
        headerBg: "rgba(255,255,255,0.2)", 
        headerText: "#38bdf8",
        rowAlt: "rgba(255, 255, 255, 0.03)", 
        row: "transparent",
        hover: "rgba(255, 255, 255, 0.07)",
        scrollbarThumb: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }
    : {
        text: "#1f2937",
        headerBg: "rgba(224, 242, 254, 0.7)", 
        headerText: "#0c4a6e",
        rowAlt: "rgba(0, 0, 0, 0.02)", 
        row: "transparent",
        hover: "rgba(186, 230, 253, 0.4)",
        scrollbarThumb: "rgba(96, 165, 250, 0.5)",
        borderColor: "rgba(0, 0, 0, 0.05)",
      };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: "transparent", 
        color: palette.text,
        boxShadow: "none", 
        transition: "all 0.3s ease",
        border: `1px solid ${palette.borderColor}`,
        overflow: "hidden"
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 450,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: 4, height: 4 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { 
            backgroundColor: palette.scrollbarThumb, 
            borderRadius: 10 
          },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650, borderCollapse: "separate" }}>
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    bgcolor: palette.headerBg, 
                    backdropFilter: "blur(8px)", 
                    color: palette.headerText,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    borderBottom: `2px solid ${palette.borderColor}`,
                    py: 1.5,
                  }}
                >
                  {key.replace(/_/g, " ")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  bgcolor: rowIndex % 2 === 0 ? palette.row : palette.rowAlt,
                  transition: "background 0.2s",
                  "&:hover": { bgcolor: palette.hover },
                }}
              >
                {keys.map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      py: 1.2,
                      color: "inherit",
                      borderBottom: `1px solid ${palette.borderColor}`,
                    }}
                  >
                    {typeof row[key] === "boolean" ? row[key].toString() : row[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { renameColumn, updateColumnType } from "../../../core/services/appService";
import { DATA_TYPES } from "../../../core/constants/dataTypes";

const SchemaEditor = ({
  schema,
  userSessionFileId,
  fileName,
  onConfirm,
  darkMode,
}) => {
  const [local, setLocal] = useState(() => ({
    columns: schema?.columns ? [...schema.columns] : [],
  }));
  const [lastConfirmed, setLastConfirmed] = useState(null);

  useEffect(() => {
    setLocal({ columns: schema?.columns ? [...schema.columns] : [] });
  }, [schema]);

  const updateColumn = (i, key, value) => {
    setLocal((prev) => {
      const copy = { ...prev, columns: [...prev.columns] };
      copy.columns[i] = { ...copy.columns[i], [key]: value };
      return copy;
    });
  };

  const handleConfirm = async () => {
    if (!userSessionFileId) return;
    const rename_col = {};
    const update_dtype = {};
    local.columns.forEach((col, i) => {
      const oldName = schema.columns[i].name;
      const oldType = schema.columns[i].detectedType;
      if (col.name !== oldName) rename_col[oldName] = col.name;
      if (col.detectedType !== oldType)
        update_dtype[col.name] = col.detectedType;
    });
    try {
      if (Object.keys(rename_col).length > 0)
        await renameColumn(fileName, userSessionFileId, rename_col);
      if (Object.keys(update_dtype).length > 0)
        await updateColumnType(fileName, userSessionFileId, update_dtype);
      setLastConfirmed(JSON.parse(JSON.stringify(local)));
      onConfirm(local);
    } catch (err) {}
  };

  if (!local.columns || local.columns.length === 0) {
    return (
      <Paper
        sx={{
          mt: 2,
          p: 2,
          borderRadius: "10px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          color: "#EAE7E2",
        }}
      >
        <Typography>No schema available to edit.</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 2,
        p: 3,
        borderRadius: "10px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        color: "#EAE7E2",
        wordBreak: "break-word",
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Review Schema
      </Typography>
      {local.columns.map((c, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 1 }}>
          <TextField
            label="Column Name"
            value={c.name || ""}
            onChange={(e) => updateColumn(i, "name", e.target.value)}
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255,255,255,0.7)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255,255,255,0.7)",
              },
              "& .MuiInputBase-input": {
                color: "#EAE7E2",
              },
            }}
          />
          <FormControl size="small" sx={{ width: 140 }}>
            <InputLabel
              sx={{
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Type
            </InputLabel>
            <Select
              value={c.detectedType || ""}
              label="Type"
              onChange={(e) => updateColumn(i, "detectedType", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.7)",
                },
                "& .MuiSelect-select": {
                  color: "#EAE7E2",
                },
                "& .MuiSvgIcon-root": {
                  color: "rgba(255,255,255,0.7)",
                },
              }}
            >
              {DATA_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{
            bgcolor: "rgba(255,255,255,0.2)",
            color: "#EAE7E2",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.3)",
            },
          }}
        >
          Confirm Schema
        </Button>
      </Box>
    {lastConfirmed && (
  <Typography
    sx={{
      mt: 2,
      textAlign: "right",
      color: "#22c55e",
      fontWeight: 500
    }}
  >
    Schema confirmed. Ask your question now.
  </Typography>
)}
    </Paper>
  );
};

export default SchemaEditor;
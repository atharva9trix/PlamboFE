import React, { useState, useMemo } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppAlert from "./AppAlert";

export default function AppDropdown({
  options = [],
  value = null,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const selectedId = value?.Id || "";

  const selectedClient = useMemo(
    () => options.find((opt) => opt.Id === selectedId),
    [options, selectedId]
  );

  const handleSelect = (event) => {
    const selected = options.find((opt) => opt.Id === event.target.value);
    if (selected && onChange) onChange(selected);
  };

  const sharedGlass = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <Select
          value={selectedId}
          displayEmpty
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onChange={handleSelect}
          renderValue={() => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "0.85rem",
                  fontWeight: 400,
                }}
              >
                {selectedClient?.Client_Name || "Select Client"}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}
              />
            </Box>
          )}
          sx={{
            ...sharedGlass,
            color: "white",
            borderRadius: "8px",
            height: "32px",
            "& .MuiSelect-select": {
              padding: "0 10px !important",
              display: "flex",
              alignItems: "center",
              height: "32px",
            },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiSelect-icon": { display: "none" },
          }}
          MenuProps={{
            anchorOrigin: { vertical: "top", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
            PaperProps: {
              sx: {
                ...sharedGlass,
                borderRadius: "12px",
                color: "white",
                backgroundImage: "none",
                boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
                "& .MuiList-root": { padding: "4px 0" },
              },
            },
          }}
        >
          <Box
            sx={{
              px: 1.5,
              py: 0.8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "0.85rem", color: "white", fontWeight: 500 }}
            >
              Client
            </Typography>
            <KeyboardArrowRightIcon sx={{ color: "white", fontSize: 16 }} />
          </Box>

          {options.map((opt) => (
            <MenuItem
              key={opt.Id}
              value={opt.Id}
              sx={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.8)",
                minHeight: "28px",
                py: 0.57,
                mx: 0.6,
                my: 0.1,
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                "&.Mui-selected": {
                  backgroundColor:
                    "rgba(255, 255, 255, 0.15) !important",
                  color: "white",
                  fontWeight: 600,
                },
              }}
            >
              {opt.Client_Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <AppAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Coming Soon"
        message="This feature will be available in an upcoming release."
        isComingSoon
      />
    </>
  );
}
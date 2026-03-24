import React from "react";
import { Box, Typography, Divider, Paper, Stack, Chip, Avatar } from "@mui/material";
import { Person, Email, Badge as BadgeIcon } from "@mui/icons-material";

const DetailItem = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 0.2 }}>
    <Avatar sx={{ width: 22, height: 22 }}>
      {React.cloneElement(icon, { sx: { fontSize: 14, color: "primary.main" } })}
    </Avatar>

    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1 }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value || "—"}
      </Typography>
    </Box>
  </Stack>
);

const UserDetails = ({ user, userRoles = [] }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 2,
      background: "rgba(255,255,255,0.05)",
      color: "white",
    }}
  >
    <Stack alignItems="center" spacing={0.8} mb={1.5}>
      <Avatar
        sx={{
          width: 48,
          height: 48,
          bgcolor: "primary.main",
          fontSize: 20,
        }}
      >
        {user.firstName?.charAt(0) || <Person />}
      </Avatar>

      <Box textAlign="center">
        <Typography variant="subtitle2" fontWeight={600}>
          {user.name}
        </Typography>

        <Chip label="Active" size="small" color="success" sx={{ mt: 0.5 }} />
      </Box>
    </Stack>

    <Divider sx={{ mb: 1.5 }} />

    <Stack spacing={1.2}>
      <DetailItem icon={<Person />} label="Username" value={user.uname} />
      <DetailItem icon={<Email />} label="Email" value={user.email} />

      <Stack spacing={0.6}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 22, height: 22 }}>
            <BadgeIcon sx={{ fontSize: 14, color: "primary.main" }} />
          </Avatar>

          <Typography variant="caption" color="text.secondary">
            Assigned Role
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", pl: 3 }}>
          {userRoles.length ? (
            userRoles.map((role) => (
              <Chip key={role.id} label={role.name} size="small" variant="outlined" />
            ))
          ) : (
            <Typography variant="caption" color="text.secondary">
              No roles assigned
            </Typography>
          )}
        </Box>
      </Stack>
    </Stack>
  </Paper>
);

export default UserDetails;


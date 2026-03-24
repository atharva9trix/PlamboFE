import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Stack,
  Tooltip,
  Divider,
  Paper,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import UserDetails from "./UserDetails";
import UserEditForm from "./UserEditForm";
import DynamicSearchBar from "../CreateNewUser/components/DynamicSearchbar";
import { getUserRoleMappings } from "../../../core/services/keycloakApi";

const UserList = ({
  users,
  selectedUser,
  isEditing,
  setSelectedUser,
  setIsEditing,
  setFormData,
  formData,
  onFormSuccess,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (selectedUser && !isEditing) {
      const fetchRoles = async () => {
        try {
          const res = await getUserRoleMappings(selectedUser.uid);
          const clientMappings = res?.data?.data?.clientMappings;
          const mappings = clientMappings
            ? Object.values(clientMappings).flatMap((c) => c.mappings || [])
            : [];
          setUserRoles(mappings);
        } catch {
          onFormSuccess?.("Failed to fetch user roles", "error");
        }
      };
      fetchRoles();
    }
  }, [selectedUser, isEditing, onFormSuccess]);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);

    const [firstName, ...rest] = user.name.split(" ");
    setFormData({
      username: user.uname,
      firstName: firstName || "",
      lastName: rest.join(" ") || "",
      email: user.email,
      upass: "",
      role_id: user.role_id || "",
    });
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    return (
      user.name.toLowerCase().includes(term) ||
      user.uname.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <Box sx={{ p: 1.5 }}>
      <DynamicSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search users..."
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxHeight: "56vh",
            overflowY: "auto",
            pr: 1,

            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.3)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255,255,255,0.5)",
            },

            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.3) transparent",
          }}
        >
          {filteredUsers.map((user) => {
            const isSelected = selectedUser?.uid === user.uid;

            return (
              <Card
                key={user.uid}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  border: isSelected
                    ? "1px solid rgba(59,130,246,0.8)"
                    : "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(6px)",
                  background: isSelected
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(255,255,255,0.05)",
                  color: "white",
                }}
              >
                <CardContent sx={{ py: 1, px: 1.5 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.15)",
                        width: 30,
                        height: 30,
                      }}
                    >
                      {isSelected ? (
                        <CheckCircle sx={{ fontSize: 18 }} />
                      ) : (
                        <PersonIcon sx={{ fontSize: 18 }} />
                      )}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600} fontSize={13}>
                        {user.name}
                      </Typography>

                      <Typography
                        fontSize={12}
                        sx={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        @{user.uname}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions
                  sx={{ justifyContent: "flex-end", py: 1, px: 1.5 }}
                >
                  <Tooltip title="View">
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                      onClick={() => handleViewDetails(user)}
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,0.3)",
                        fontSize: 11,
                        px: 1.2,
                      }}
                      variant={
                        isSelected && !isEditing ? "contained" : "outlined"
                      }
                    >
                      View
                    </Button>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <Button
                      size="small"
                      startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                      onClick={() => handleEditClick(user)}
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,0.3)",
                        fontSize: 11,
                        px: 1.2,
                      }}
                      variant={
                        isSelected && isEditing ? "contained" : "outlined"
                      }
                    >
                      Edit
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })}
        </Box>

        <Box sx={{ flex: 1 }}>
          {selectedUser ? (
            <Paper
              sx={{
                borderRadius: 2,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {isEditing ? (
                <UserEditForm
                  userId={selectedUser.uid}
                  formData={formData}
                  setFormData={setFormData}
                  onSuccess={onFormSuccess}
                />
              ) : (
                <UserDetails user={selectedUser} userRoles={userRoles} />
              )}
            </Paper>
          ) : (
            <Typography
              align="center"
              fontSize={13}
              sx={{ color: "rgba(255,255,255,0.6)" }}
            >
              Select a user to view details
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;

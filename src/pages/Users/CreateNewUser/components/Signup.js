import React from "react";
import { Paper, Box, Typography, Divider } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SignupForm from "./SignUpForm";
import SignupAlert from "./SignUpAlert";
import useSignupForm from "../hooks/useSignUpForm";

const Signup = () => {
  const { formData, error, success, handleChange, handleSubmit } =
    useSignupForm();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "550px",
        mx: "auto",
        mt: 2.5,
        p: 2.5,
        borderRadius: 4,
       
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        color: "white",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <PersonAddAlt1Icon
            sx={{ mr: 1, fontSize: 22, color: "rgba(255,255,255,0.8)" }}
          />
          <Typography fontWeight={600} fontSize={17} letterSpacing={0.5}>
            Create New User
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>

      <Box sx={{ mt: "auto", pt: 2 }}>
        <SignupAlert error={error} success={success} />
      </Box>
    </Paper>
  );
};

export default Signup;

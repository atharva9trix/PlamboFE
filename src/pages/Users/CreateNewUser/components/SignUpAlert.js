import React from "react";
import { Alert } from "@mui/material";

const SignupAlert = ({ error, success }) => (
  <>
    {error && (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    )}
    {success && (
      <Alert severity="success" sx={{ mt: 3 }}>
        {success}
      </Alert>
    )}
  </>
);

export default SignupAlert;

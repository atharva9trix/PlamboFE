import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./ui/theme/theme";
import MainLayout from "./layout/MainLayout";
import AppRoutes from "./app/routes";
import { AppProvider } from "./app/providers/AppProvider";

function AppContent() {
  const location = useLocation();
  const isUnprotectedRoute = location.pathname === "/login";

  return (
    <ThemeProvider theme={theme}>
      {isUnprotectedRoute ? (
        <AppRoutes />
      ) : (
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      )}
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
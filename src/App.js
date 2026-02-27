import MainLayout from "./layout/MainLayout";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./app/routes";
import { ThemeProvider } from "@mui/material";
import theme from "./ui/theme/theme";

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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
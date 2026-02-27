import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/Home/HomePage";
import LoginPage from "../../pages/Login/LoginPage";
import AuthGuard from "../context/AuthGuard";

import analyzeRoutes from "../../features/analyze/analyze.routes";
import briefRoutes from "../../features/brief/brief.routes";
import generateRoutes from "../../features/generate/generate.routes";
import audienceRoutes from "../../features/audience/audience.routes";
import activateRoutes from "../../features/activate/activate.routes";
import projectRoutes from "../../features/project/project.route";

export default function AppRoutes() {
  const dynamicRoutes = [
    ...analyzeRoutes,
    ...briefRoutes,
    ...generateRoutes,
    ...audienceRoutes,
    ...activateRoutes,
    ...projectRoutes,
  ];

  return (
    <Routes>
    
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      />

      {dynamicRoutes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          element={<AuthGuard>{route.element}</AuthGuard>}
        />
      ))}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
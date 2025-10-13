import { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./src/pages/LoginPage";
import RegistroPage from "./src/pages/RegistroPage";
import SpinPage from "./src/pages/JuegoPage";

export default function AppRoutes() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);


  return (
    <Router>
      <Routes>
        {/* Página de registro */}
        <Route path="/registro" element={<RegistroPage />} />

        {/* Página de login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Página de spin, protegida */}
        <Route
          path="/spin"
          element={(
              <SpinPage token={token} idUsuario={userId} />
            ) 
          }
        />

        {/* Ruta por defecto: si no hay match, va a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

// src/services/api.js
import axios from "axios";

// Crear instancia base de axios
const api = axios.create({
  baseURL: "http://localhost:3000/auth", // 👈 Cambiá esto si tu backend corre en otra URL
});

// =========================
// Registro de usuario
// =========================
export const registroUsuario = async (nombres, dni) => {
  try {
    const res = await api.post("/registro", { nombres, dni });
    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Error en el registro" };
  }
};

// =========================
// Login de usuario
// =========================
export const loginUsuario = async (dni) => {
  try {
    const res = await api.post("/login", { dni });
    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Error al iniciar sesión" };
  }
};

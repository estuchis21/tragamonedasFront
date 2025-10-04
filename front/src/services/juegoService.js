// src/services/api.js
import axios from "axios";

// Crear instancia base de axios
const api = axios.create({
  baseURL: "http://localhost:3000/juego", // 👈 Cambiá esto si tu backend corre en otra URL
});


// =========================
// Ejecutar Spin
// =========================
export const ejecutarSpin = async (token, id_usuario, apuesta) => {
  try {
    const res = await api.post(
      "/ejecutarSpin",
      { id_usuario, apuesta },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Error al ejecutar el spin" };
  }
};


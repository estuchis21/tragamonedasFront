import axios from "axios";

const apiJuego = axios.create({
  baseURL: "http://localhost:3000/juego", // backend juego
});

// Ejecutar spin
export const ejecutarSpin = async (token, id_usuario, apuesta) => {
  if (!id_usuario) throw new Error("ID de usuario no encontrado");
  if (!token) throw new Error("Token no encontrado");

  try {
    const res = await apiJuego.post(
      "/spin",
      { id_usuario: Number(id_usuario), apuesta },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.mensaje || "Error al ejecutar el spin");
  }
};

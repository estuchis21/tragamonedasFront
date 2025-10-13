import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:3000/auth", // backend auth
});

// Registro
export const registroUsuario = async (nombres, dni) => {
  try {
    const res = await apiAuth.post("/registro", { nombres, dni });
    return res.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: "Error en registro" };
  }
};

// Login
export const loginUsuario = async (dni) => {
  try {
    const res = await apiAuth.post("/login", { dni });
    return res.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: "Error al iniciar sesión" };
  }
};

// Obtener usuario por ID
export const obtenerUsuario = async (token, id_usuario) => {
  if (!id_usuario) throw new Error("ID de usuario no encontrado");
  try {
    const res = await apiAuth.get(`/getUserId/${Number(id_usuario)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.mensaje || "Error al obtener usuario");
  }
};

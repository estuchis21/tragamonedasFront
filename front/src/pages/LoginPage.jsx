import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/authService";

export default function LoginPage() {
  const [dni, setDni] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

    const moveToRegistro = async () => {
      navigate("/registro")
    }

  const handleLogin = async () => {
    if (!dni) return setMensaje("Ingresa tu DNI");
    setLoading(true);
    setMensaje("");

    try {
      const res = await loginUsuario(dni);

      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("id_usuario", res.user.id_usuario);

        setMensaje("Login exitoso 🎉");
        navigate("/spin"); // redirigir
      } else {
        setMensaje(res.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setMensaje(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", textAlign: "center" }}>
      <h2>🔑 Login</h2>
      <input
        type="number"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="Ingresa tu DNI"
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
      <button onClick={moveToRegistro} style={{ padding: "0.5rem 1rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer" }} >¿No está registrado? Regístrese!</button>
      {mensaje && <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{mensaje}</p>}
    </div>
  );
}

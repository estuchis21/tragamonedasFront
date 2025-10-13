import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registroUsuario } from "../services/authService";

export default function RegistroPage() {
  const [nombres, setNombres] = useState("");
  const [dni, setDni] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate("/login");
  };

  const handleRegistro = async () => {
    if (!nombres || !dni) {
      setMensaje("Por favor completá todos los campos.");
      return;
    }

    setLoading(true);
    try {
      await registroUsuario(nombres, dni);
      setMensaje("Registro exitoso, ya podés loguearte.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMensaje(err.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Registro</h2>

      <input
        type="text"
        placeholder="Nombres"
        value={nombres}
        onChange={(e) => setNombres(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        disabled={loading}
      />

      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value.replace(/\D/, ""))} // solo números
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        disabled={loading}
      />

      <button
        onClick={handleRegistro}
        disabled={loading}
        style={{
          width: "100%",
          padding: "0.7rem",
          marginBottom: "0.5rem",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <button
        onClick={moveToLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "0.7rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        Volver al login
      </button>

      {mensaje && (
        <p
          style={{
            color: mensaje.includes("exitoso") ? "green" : "red",
            marginTop: "1rem",
          }}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
}

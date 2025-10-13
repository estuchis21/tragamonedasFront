import { useEffect, useState } from "react";
import { ejecutarSpin } from "../services/juegoService";

export default function JuegoPage() {
  const [idUser, setIdUser] = useState(null);
  const [token, setToken] = useState(null);
  const [apuesta, setApuesta] = useState(10);
  const [matriz, setMatriz] = useState([]);
  const [combinaciones, setCombinaciones] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id_usuario");
    const storedToken = localStorage.getItem("token");
    if (storedId) setIdUser(Number(storedId));
    if (storedToken) setToken(storedToken);
  }, []);

  const handleSpin = async () => {
    if (!idUser) return setMensaje("Usuario no definido");
    if (apuesta <= 0) return setMensaje("Ingresa una apuesta válida");

    setLoading(true);
    setMensaje("");

    try {
      const res = await ejecutarSpin(token, idUser, apuesta);

      if (res.success) {
        // Convertir matriz plana a 2D (3 filas x 5 columnas)
        const filas = Array.from({ length: 3 }, () => Array(5).fill(null));
        res.matriz.forEach((item) => {
          filas[item.fila - 1][item.columna - 1] = item.nombre;
        });

        setMatriz(filas);
        setCombinaciones(res.combinaciones);
        setSaldo(res.saldo);

        const totalGanado = res.combinaciones.reduce(
          (acc, c) => acc + c.valor,
          0
        );

        setMensaje(
          totalGanado > 0
            ? `🎉 ¡Ganaste $${totalGanado}!`
            : "No ganaste esta vez. Intenta de nuevo 🎰"
        );
      } else {
        setMensaje(res.mensaje || "Error al ejecutar el spin");
      }
    } catch (err) {
      setMensaje(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>🎰 Juego de Spin</h2>
      <p>Saldo: ${saldo}</p>

      <input
        type="number"
        value={apuesta}
        onChange={(e) => setApuesta(Number(e.target.value))}
        style={{ padding: "0.5rem", width: 100, marginRight: 10 }}
      />
      <button onClick={handleSpin} disabled={loading}>
        {loading ? "Spineando..." : "Spinear 🎲"}
      </button>

      {mensaje && <p style={{ fontWeight: "bold", marginTop: "1rem" }}>{mensaje}</p>}

      {matriz.length > 0 && (
        <div style={{ display: "inline-block", marginTop: 20 }}>
          {matriz.map((fila, i) => (
            <div
              key={i}
              style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}
            >
              {fila.map((simbolo, j) => (
                <div
                  key={j}
                  style={{
                    width: 60,
                    padding: 5,
                    border: "1px solid #ccc",
                    margin: "0 2px",
                    fontWeight: "bold",
                  }}
                >
                  {simbolo || "-"}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {combinaciones.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>🏆 Combinaciones ganadoras:</h3>
          <ul>
            {combinaciones.map((c, i) => (
              <li key={i}>
                {`${c.tipo} ${c.cantidad_simbolos} símbolos - $${c.valor}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

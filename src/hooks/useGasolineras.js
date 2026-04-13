import { useState, useEffect } from "react";

const API_URL = "/gasolineras-api/EstacionesTerrestres/";

export function useGasolineras() {
  const [gasolineras, setGasolineras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📡 Iniciando fetch a:", API_URL);

    fetch(API_URL)
      .then((res) => {
        console.log("📥 Status:", res.status);
        console.log("📄 Content-Type:", res.headers.get("content-type"));
        return res.text(); // ← text() primero, no json()
      })
      .then((text) => {
        console.log("📦 Primeros 300 caracteres:", text.substring(0, 300));
        const data = JSON.parse(text); // parseamos manualmente
        console.log("✅ Claves del objeto:", Object.keys(data));
        console.log("🔢 Total gasolineras:", data.ListaEESSPrecio?.length);
        setGasolineras(data.ListaEESSPrecio || []);
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        setError(err.message);
      })
      .finally(() => {
        console.log("🏁 Fetch terminado, loading = false");
        setLoading(false);
      });
  }, []);

  return { gasolineras, loading, error };
}
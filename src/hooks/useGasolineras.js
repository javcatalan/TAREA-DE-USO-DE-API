// src/hooks/useGasolineras.js
import { useState, useEffect } from "react";

const API_DIRECTA =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";

const PROXIES = [
  `https://api.allorigins.win/raw?url=${encodeURIComponent(API_DIRECTA)}`,
  `https://thingproxy.freeboard.io/fetch/${API_DIRECTA}`,
];

export function useGasolineras() {
  const [gasolineras, setGasolineras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Intenta cada proxy en orden hasta que uno funcione
    const intentar = async (indice) => {
      if (indice >= PROXIES.length) {
        setError("No se pudo conectar con la API. Intenta recargar la página.");
        setLoading(false);
        return;
      }

      try {
        console.log(`Intentando proxy ${indice + 1}:`, PROXIES[indice]);
        const res = await fetch(PROXIES[indice]);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const text = await res.text();
        const data = JSON.parse(text);
        if (!data.ListaEESSPrecio) throw new Error("Formato inesperado");
        console.log(`✅ Proxy ${indice + 1} funcionó. Total: ${data.ListaEESSPrecio.length}`);
        setGasolineras(data.ListaEESSPrecio);
      } catch (err) {
        console.warn(`❌ Proxy ${indice + 1} falló:`, err.message);
        intentar(indice + 1);
      } finally {
        setLoading(false);
      }
    };

    intentar(0);
  }, []);

  return { gasolineras, loading, error };
}
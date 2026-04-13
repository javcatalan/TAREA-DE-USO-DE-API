// src/hooks/useGasolineras.js
import { useState, useEffect } from "react";

const API_URL =
  "https://corsproxy.io/?url=" +
  encodeURIComponent(
    "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
  );

export function useGasolineras() {
  const [gasolineras, setGasolineras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.text())
      .then((text) => {
        const data = JSON.parse(text);
        setGasolineras(data.ListaEESSPrecio || []);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { gasolineras, loading, error };
}
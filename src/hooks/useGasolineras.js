// src/hooks/useGasolineras.js
import { useState, useEffect } from "react";

const API_URL = "/.netlify/functions/gasolineras";

export function useGasolineras() {
  const [gasolineras, setGasolineras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
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
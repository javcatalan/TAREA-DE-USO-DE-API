// src/hooks/useGeolocation.js
import { useState, useEffect } from "react";

export function useGeolocation(ciudadSeleccionada) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Si hay una ciudad seleccionada manualmente, la usamos directamente
    if (ciudadSeleccionada && ciudadSeleccionada.lat !== null) {
      setPosition({ lat: ciudadSeleccionada.lat, lon: ciudadSeleccionada.lon });
      setError(null);
      setCargando(false);
      return;
    }

    // Si eligió "Usar mi ubicación real"
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      setCargando(false);
      return;
    }

    setCargando(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setError(null);
        setCargando(false);
      },
      () => {
        setError("No se pudo obtener tu ubicación. Selecciona una ciudad.");
        setCargando(false);
      }
    );
  }, [ciudadSeleccionada]);

  return { position, error, cargando };
}
import { useMemo, useState } from "react";
import { useGasolineras } from "./hooks/useGasolineras";
import { useGeolocation } from "./hooks/useGeolocation";
import { haversine } from "./utils/haversine";
import { CIUDADES } from "./utils/ciudades";
import FilterPanel from "./components/FilterPanel";
import GasolinerasList from "./components/GasolinerasList";
import SelectorUbicacion from "./components/SelectorUbicacion";
import "./App.css";

const FILTROS_INICIALES = {
  empresa: "",
  carburante: "Precio Gasolina 95 E5",
  radioKm: 5,
};

export default function App() {
  const { gasolineras, loading, error } = useGasolineras();
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(CIUDADES[1]);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const { position, error: geoError, cargando: geoCargando } = useGeolocation(ciudadSeleccionada);

  const resultado = useMemo(() => {
    if (!position || !gasolineras.length) return [];
    return gasolineras
      .map((g) => {
        const lat = parseFloat(g["Latitud"].replace(",", "."));
        const lon = parseFloat(g["Longitud (WGS84)"].replace(",", "."));
        return { ...g, distancia: haversine(position.lat, position.lon, lat, lon) };
      })
      .filter((g) =>
        g.distancia <= filtros.radioKm &&
        (!filtros.empresa || g["Rótulo"] === filtros.empresa) &&
        !!g[filtros.carburante]
      )
      .sort((a, b) => a.distancia - b.distancia)
      .slice(0, 50);
  }, [gasolineras, position, filtros]);

  if (loading) return (
    <div className="estado">
      <div className="spinner"></div>
      <p>Cargando precios de carburantes...</p>
    </div>
  );

  if (error) return (
    <div className="estado error">
      <span className="icono-grande">⚠️</span>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>⛽ Gasolineras cercanas</h1>
        <p className="subtitulo">Precios en tiempo real · Ministerio para la Transformación Digital</p>
        {position && !geoCargando && (
          <p className="pos-info">
            📍 {ciudadSeleccionada.lat === null ? "Tu ubicación GPS" : ciudadSeleccionada.nombre}
            &nbsp;·&nbsp;{position.lat.toFixed(4)}, {position.lon.toFixed(4)}
          </p>
        )}
      </header>

      {geoCargando && (
        <div className="aviso-geo info">📡 Obteniendo tu ubicación GPS...</div>
      )}
      {geoError && (
        <div className="aviso-geo error">⚠️ {geoError} — Selecciona una ciudad manualmente.</div>
      )}

      <div className="panel-controles">
        <SelectorUbicacion
          ciudadSeleccionada={ciudadSeleccionada}
          setCiudadSeleccionada={setCiudadSeleccionada}
        />
        <FilterPanel
          gasolineras={gasolineras}
          filtros={filtros}
          setFiltros={setFiltros}
        />
      </div>

      <div className="barra-resultados">
        <p className="contador">
          <strong>{resultado.length}</strong> gasolineras en un radio de <strong>{filtros.radioKm} km</strong>
        </p>
      </div>

      <GasolinerasList gasolineras={resultado} filtros={filtros} />
    </div>
  );
}
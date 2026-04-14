// src/components/SelectorUbicacion.jsx
import { CIUDADES } from "../utils/ciudades";

export default function SelectorUbicacion({ ciudadSeleccionada, setCiudadSeleccionada }) {
  return (
    <div className="campo ancho-completo">
      <label> Ubicación</label>
      <select
        value={ciudadSeleccionada.nombre}
        onChange={(e) => {
          const ciudad = CIUDADES.find((c) => c.nombre === e.target.value);
          setCiudadSeleccionada(ciudad);
        }}
      >
        {CIUDADES.map((c) => (
          <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
        ))}
      </select>
    </div>
  );
}
// src/components/GasolinerasList.jsx
import GasolineraCard from "./GasolineraCard";

export default function GasolinerasList({ gasolineras, filtros }) {
  if (!gasolineras.length)
    return <p className="empty">No hay gasolineras en ese radio con esos filtros.</p>;

  return (
    <div className="gasolineras-list">
      {gasolineras.map((g, i) => (
        <GasolineraCard key={i} gasolinera={g} carburante={filtros.carburante} />
      ))}
    </div>
  );
}
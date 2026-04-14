// src/components/GasolineraCard.jsx
export default function GasolineraCard({ gasolinera, carburante }) {
  const precioRaw = gasolinera[carburante]?.replace(",", ".");
  const precio = precioRaw ? parseFloat(precioRaw).toFixed(3) : null;

  return (
    <div className="gasolinera-card">
      <span className="rotulo">{gasolinera["Rótulo"]}</span>

      <div className={`precio-badge ${!precio ? "sin-precio" : ""}`}>
        {precio ? `${precio} €/L` : "Sin dato"}
      </div>

      <div className="meta">
        <span className="direccion">
          {gasolinera["Dirección"]}, {gasolinera["Municipio"]}
        </span>
        <span className="distancia-pill">
           {gasolinera.distancia.toFixed(1)} km
        </span>
      </div>
    </div>
  );
}
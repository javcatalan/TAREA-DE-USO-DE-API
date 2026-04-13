// src/components/FilterPanel.jsx
export default function FilterPanel({ gasolineras, filtros, setFiltros }) {
  const empresas = [...new Set(gasolineras.map((g) => g["Rótulo"]))].sort();

  const tiposCarburante = [
    { key: "Precio Gasolina 95 E5",                  label: "Gasolina 95" },
    { key: "Precio Gasolina 98 E5",                  label: "Gasolina 98" },
    { key: "Precio Gasoleo A",                        label: "Gasóleo A" },
    { key: "Precio Gasoleo B",                        label: "Gasóleo B" },
    { key: "Precio Gases licuados del petróleo",      label: "GLP" },
  ];

  return (
    <>
      <div className="campo">
        <label>Empresa / Marca</label>
        <select
          value={filtros.empresa}
          onChange={(e) => setFiltros({ ...filtros, empresa: e.target.value })}
        >
          <option value="">Todas las marcas</option>
          {empresas.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className="campo">
        <label>Tipo de combustible</label>
        <select
          value={filtros.carburante}
          onChange={(e) => setFiltros({ ...filtros, carburante: e.target.value })}
        >
          {tiposCarburante.map((t) => (
            <option key={t.key} value={t.key}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="campo ancho-completo">
        <label>Radio de búsqueda</label>
        <input
          type="range" min="1" max="50" step="1"
          value={filtros.radioKm}
          onChange={(e) => setFiltros({ ...filtros, radioKm: Number(e.target.value) })}
        />
        <span className="slider-valor">{filtros.radioKm} km</span>
      </div>
    </>
  );
}
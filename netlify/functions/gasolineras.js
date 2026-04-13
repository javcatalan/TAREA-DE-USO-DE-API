const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const response = await fetch(
      "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error API Ministerio: " + response.status }),
      };
    }

    const data = await response.json();
    const lista = data.ListaEESSPrecio || [];

    // Solo devolvemos los campos que usa la app
    const reducida = lista.map((g) => ({
      "Rótulo":               g["Rótulo"],
      "Dirección":            g["Dirección"],
      "Municipio":            g["Municipio"],
      "Latitud":              g["Latitud"],
      "Longitud (WGS84)":     g["Longitud (WGS84)"],
      "Precio Gasolina 95 E5":           g["Precio Gasolina 95 E5"],
      "Precio Gasolina 98 E5":           g["Precio Gasolina 98 E5"],
      "Precio Gasoleo A":                g["Precio Gasoleo A"],
      "Precio Gasoleo B":                g["Precio Gasoleo B"],
      "Precio Gases licuados del petróleo": g["Precio Gases licuados del petróleo"],
    }));

    console.log(`Total gasolineras: ${reducida.length}`);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ListaEESSPrecio: reducida }),
    };
  } catch (error) {
    console.error("Error en la función:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
const BASE_URL = "https://mindicador.cl/api";

export async function obtenerTodosLosIndicadores() {
  const respuesta = await fetch(BASE_URL);
  if (!respuesta.ok) {
    throw new Error("Error al obtener los indicadores");
  }
  const datos = await respuesta.json();
  return datos;
}

export async function obtenerSerieIndicador(tipo) {
    const res = await fetch(`https://mindicador.cl/api/${tipo}`);
    if (!res.ok) throw new Error("Error al obtener la serie del indicador");
    const data = await res.json();
  
    return data.serie.map((item) => ({
      fecha: item.fecha,
      valor: item.valor,
      unidad: data.unidad_medida, // <- agregamos la unidad
    }));
  }

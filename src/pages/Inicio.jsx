import React, { useEffect, useState } from "react";
import { obtenerTodosLosIndicadores } from "../api";
import IndicadorCard from "../components/IndicadorCard";
import { Grid, Typography, Container, CircularProgress } from "@mui/material";

function Inicio() {
  const [indicadores, setIndicadores] = useState([]);
  const [loading, setLoading] = useState(true);
  //const prueba = noExiste.esto;// esto es un error de prueba del Error boundary que se debe descomentar para probar el error boundary

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await obtenerTodosLosIndicadores();
        const clavesDeseadas = ["dolar", "uf", "euro", "ipc"];
        const filtrados = clavesDeseadas.map((clave) => ({
          tipo: clave,
          nombre: data[clave].nombre,
          valor: data[clave].valor,
          unidad: data[clave].unidad_medida,
        }));
        setIndicadores(filtrados);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#0D47A1", fontWeight: "bold" }}
      >
        Indicadores Financieros de Chile
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {indicadores.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <IndicadorCard indicador={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Inicio;

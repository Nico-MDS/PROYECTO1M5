import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerSerieIndicador } from "../api";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Detalle() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [serieCompleta, setSerieCompleta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(false);

  const [fechaInicio, setFechaInicio] = useState(dayjs().subtract(7, "day"));
  const [fechaFin, setFechaFin] = useState(dayjs());

  useEffect(() => {
    async function cargarSerie() {
      try {
        const datos = await obtenerSerieIndicador(tipo);
        setSerieCompleta(Array.isArray(datos) ? datos : []);
        setErrorApi(false);
      } catch (error) {
        console.error("Error al cargar la serie", error);
        setErrorApi(true);
      } finally {
        setLoading(false);
      }
    }

    cargarSerie();
  }, [tipo]);

  const volver = () => {
    navigate("/");
  };

  const serieFiltrada = serieCompleta.filter((item) => {
    const fechaItem = dayjs(item.fecha);
    return (
      fechaItem.isAfter(fechaInicio.subtract(1, "day")) &&
      fechaItem.isBefore(fechaFin.add(1, "day"))
    );
  });

  return (
    <Container sx={{ mt: 5 }}>
      <Button variant="outlined" onClick={volver} sx={{ mb: 2 }}>
        ← Volver al inicio
      </Button>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#0D47A1", fontWeight: "bold" }}
      >
        Historial de {tipo?.toUpperCase()}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <DatePicker
            label="Fecha inicio"
            value={fechaInicio}
            onChange={(nuevaFecha) => setFechaInicio(nuevaFecha)}
            maxDate={fechaFin}
          />
          <DatePicker
            label="Fecha fin"
            value={fechaFin}
            onChange={(nuevaFecha) => setFechaFin(nuevaFecha)}
            minDate={fechaInicio}
            maxDate={dayjs()}
          />
        </Stack>
      </LocalizationProvider>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : errorApi ? (
        <Typography color="error" sx={{ mt: 4 }}>
          Ocurrió un error al obtener los datos del indicador.
        </Typography>
      ) : serieFiltrada.length === 0 ? (
        <Typography sx={{ mt: 4 }} color="warning.main">
          No hay datos disponibles en el rango seleccionado.
        </Typography>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={serieFiltrada.map((item) => ({
                fecha: new Date(item.fecha).toLocaleDateString("es-CL"),
                valor: item.valor,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#1976d2" />
            </LineChart>
          </ResponsiveContainer>

          <Table sx={{ mt: 4 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Fecha</strong>
                </TableCell>
                <TableCell>
                  <strong>Valor</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serieFiltrada.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#4fc3f7" }}>
                    {new Date(item.fecha).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell sx={{ color: "#4fc3f7" }}>
                    {item.unidad === "Porcentaje"
                      ? `${item.valor.toFixed(2)}%`
                      : `$${item.valor.toLocaleString("es-CL")}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default Detalle;

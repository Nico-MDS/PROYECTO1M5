import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function IndicadorCard({ indicador }) {
  const navigate = useNavigate();

  const manejarClick = () => {
    navigate(`/detalle/${indicador.tipo}`);
  };

  return (
    <Card onClick={manejarClick} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Typography variant="h6">{indicador.nombre}</Typography>
        <Typography variant="h5">${indicador.valor.toLocaleString("es-CL")}</Typography>
        <Typography variant="body2">{indicador.unidad}</Typography>
      </CardContent>
    </Card>
  );
}

export default IndicadorCard;

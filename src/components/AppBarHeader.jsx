import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from "../assets/logo-bootcamp.png";

function AppBarHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0D1B2A" }}>
      <Toolbar sx={{ display: "flex", alignItems: "top" }}>
        <Box
          component="img"
          src={logo}
          alt="Logo Bootcamp"
          sx={{
            width: "20vw",
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "#121212", // opcional para fondo oscuro
          }}
        />
        <Typography variant="h6" component="div">
        Proyecto 5. Aplicación web con REACT: Indicadores Financieros de Chile
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarHeader;

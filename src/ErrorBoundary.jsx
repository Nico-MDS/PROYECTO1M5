import React from "react";
import { Typography, Box } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado por ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
        return (
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#121212", // opcional para fondo oscuro
              }}
            >
              <Typography variant="h4" color="error" gutterBottom>
                ¡Algo salió mal! = Sirve Error Boundary :)
              </Typography>
              <Typography variant="body1" color="white">
                Por favor, intenta recargar la página o vuelve más tarde.
              </Typography>
            </Box>
          );
          
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

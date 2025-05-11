import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Detalle from "./pages/Detalle";
import AppBarHeader from "./components/AppBarHeader";

function App() {
  return (
    <Router>
      <AppBarHeader />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/detalle/:tipo" element={<Detalle />} />
      </Routes>
    </Router>
  );
}

export default App;

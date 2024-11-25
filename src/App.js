import { BrowserRouter as Router } from "react-router-dom";
import './App.css'; // Este archivo no es necesario si ya tienes la configuración de Tailwind en index.css
import { EstadoProveedor } from "./context/EstadoGeneral"; // Asegúrate de que esta importación esté bien configurada
import Routes from "./Routes"; // Importar las rutas definidas

function App() {
  return (
      <Router>
    <EstadoProveedor>
        <Routes/>
    </EstadoProveedor>
      </Router>
  );
}

export default App;

import './App.css';
import { EstadoProveedor } from "./context/EstadoGeneral";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <EstadoProveedor>
      <Router>
        <Routes/>
      </Router>
    </EstadoProveedor>
  );
}

export default App;

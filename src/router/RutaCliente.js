import React, { useContext } from "react";  // Asegúrate de importar `useContext`
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { EstadoContexto } from "../context/EstadoGeneral";  // Asegúrate de que esta ruta es correcta

// Componente RutaCliente
const RutaCliente = ({ component: Component, layout: Layout, ...rest }) => {
  const { usuario } = useContext(EstadoContexto);  // CORRECCIÓN: `useContext` ahora se usa correctamente
  const isAuthenticated = Object.keys(usuario).length > 0;

  // Corrección: Verificar si el usuario está autenticado y tiene el rol "cliente"
  return isAuthenticated && usuario.Rol === "cliente" ? (
    <Layout>
      <Component {...rest} />  {/* CORRECCIÓN: Asegúrate de que `Component` sea un componente válido */}
    </Layout>
  ) : (
    <Navigate to="/ingresar" replace />  // Si no está autenticado, redirige a la página de login
  );
};

// Definición de PropTypes
RutaCliente.propTypes = {
  component: PropTypes.elementType.isRequired,  // CORRECCIÓN: Asegúrate de pasar un componente válido
  layout: PropTypes.elementType.isRequired,     // `layout` también debe ser un componente válido
};

export default RutaCliente;

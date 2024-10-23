import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Importación correcta para redirección con v6
import PropTypes from "prop-types";
import { EstadoContexto } from "../context/EstadoGeneral";

const RutaSemiPrivada = ({ layout: Layout, element: Element, ...rest }) => {
  const { usuario } = useContext(EstadoContexto);
  const existeUsuario = Object.keys(usuario).length > 0;  // Verifica si el usuario existe

  // Si el usuario existe, redirige al home. Si no, renderiza el componente dentro del layout
  return existeUsuario ? (
    <Navigate to="/" replace />  // Redirige al home si el usuario ya existe
  ) : (
    <Layout>
      <Element {...rest} /> {/* Renderiza el componente dentro del layout */}
    </Layout>
  );
};

RutaSemiPrivada.propTypes = {
  element: PropTypes.elementType.isRequired,  // `elementType` para aceptar un componente React
  layout: PropTypes.elementType.isRequired,   // `layout` debe ser un componente React
};

export default RutaSemiPrivada;
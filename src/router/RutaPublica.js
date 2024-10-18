import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { EstadoContexto } from "../context/EstadoGeneral";

const RutaPrivada = ({ layout: Layout, element: Component, ...rest }) => {
  const { usuario } = useContext(EstadoContexto);
  const existeUsuario = Object.keys(usuario).length > 0; // Verifica si el usuario existe

  return (
    <Route
      {...rest}
      element={
        existeUsuario && usuario.Rol === "administrador" ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Navigate to="/ingresar" replace />
        )
      }
    />
  );
};

RutaPrivada.propTypes = {
  element: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
  path: PropTypes.string,
};

export default RutaPrivada;

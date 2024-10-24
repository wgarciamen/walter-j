import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { EstadoContexto } from "../context/EstadoGeneral";

const RutaPrivadaAdmin = ({
  layout: Layout,
  component: Component,
  ...rest
}) => {
  const { usuario } = useContext(EstadoContexto);
  const existeUsuario = Object.keys(usuario).length;
  const location = useLocation();

  return existeUsuario && usuario?.Rol === "administrador" ? (
    <Layout>
      <Component {...rest} />
    </Layout>
  ) : (
    <Navigate to="/ingresar" state={{ from: location }} />
  );
};

RutaPrivadaAdmin.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
};

export default RutaPrivadaAdmin;

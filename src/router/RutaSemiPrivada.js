import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { EstadoContexto } from "../context/EstadoGeneral";

const RutaSemiPrivada = ({ layout: Layout, component: Component, ...rest }) => {
  const { usuario } = useContext(EstadoContexto);
  const existeUsuario = Object.keys(usuario).length;
  const location = useLocation();

  return !existeUsuario ? (
    <Layout>
      <Component {...rest} />
    </Layout>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

RutaSemiPrivada.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
};

export default RutaSemiPrivada;
//   wgarciamen@gmail.com
// 44212

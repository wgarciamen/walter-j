import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom"; // Cambiado Redirect por Navigate
import PropTypes from "prop-types";
import { EstadoContexto } from "../context/EstadoGeneral";

const RutaPrivada = (props) => {
  const { layout: Layout, component: Component,location,...rest } = props;
  const { usuario } = useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length;

  return (
    <Routes>
      {exiteUsuario && usuario.Rol === "administrador" ? (
        <Route
          {...rest}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ) : (
        <Route
          path="*"
          element={
            <Navigate // Cambiado Redirect por Navigate
              to={{
                pathname: "/ingresar",
                state: { from: location },
              }}
            />
          }
        />
      )}
    </Routes>
  );
};

RutaPrivada.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RutaPrivada;
import React, { useContext } from "react";
import Menu from "../../components/Menu/Menu";
import { SidebarCliente } from "../../components/sidebars";
import { EstadoContexto } from "../../context/EstadoGeneral";
import CalcularPantalla from "../../util/CalcularPantalla";

const LayoutGeneral = ({ children }) => {
  const { ancho } = CalcularPantalla();
  const { usuario } = useContext(EstadoContexto);
  const exiteUsuario = Object.keys(usuario).length;

  return (
    <>
      <Menu />
      {exiteUsuario && ancho <= 800 ? (
        usuario.Rol === "administrador" ? (
          <></>
        ) : (
          <SidebarCliente />
        )
      ) : (
        <></>
      )}

      <section style={{ marginTop: "75px" }}>
        <div>{children}</div>
      </section>
    </>
  );
};

export default LayoutGeneral;

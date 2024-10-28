import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RutaCliente, RutaAdministrador, RutaSemiPrivada } from "./router";
import { LayoutGeneral, LayoutCliente, LayoutAdministracion } from "./layout/conLayout";
import SinLayout from "./layout/SinLayout/SinLayout";
import {
  Pagina404,
  GeneralInicio,
  GeneralRegistrar,
  GeneralIngresar,
  GeneralGraciasPorRegistrarte,
  GeneralRecuperarContrasena,
  GeneralVerificar,
  GeneralIngresarAdministrador,
  GeneralCheckout,
  ClientePerfil,
  AdmnistradorReportes, // Manteniendo la escritura original
  AdmnistradorCategorias, // Manteniendo la escritura original
  AdmnistradorCategoriasCrear, // Manteniendo la escritura original
  AdmnistradorCategoriasEditar, // Manteniendo la escritura original
  AdmnistradorEtiquetas, // Manteniendo la escritura original
  AdmnistradorProductos, // Manteniendo la escritura original
  AdmnistradorProductosCrear, // Manteniendo la escritura original
  AdmnistradorProductosEditar, // Manteniendo la escritura original
  AdmnistradorPersonales, // Manteniendo la escritura original
  AdmnistradorPedidos, // Manteniendo la escritura original
  AdmnistradorClientes, // Manteniendo la escritura original
} from "./pages"; // Asegúrate de que estos componentes están correctamente exportados en "./pages"

const RoutesComponent = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route
        path="/"
        element={
          <LayoutGeneral>
            <GeneralInicio />
          </LayoutGeneral>
        }
      />
      <Route
        path="/checkout"
        element={
          <LayoutGeneral>
            <GeneralCheckout />
          </LayoutGeneral>
        }
      />
      <Route
        path="/registrar"
        element={
          <LayoutGeneral>
            <GeneralRegistrar />
          </LayoutGeneral>
        }
      />
      <Route
        path="/ingresar"
        element={
          <LayoutGeneral>
            <GeneralIngresar />
          </LayoutGeneral>
        }
      />
      <Route
        path="/gracias-por-registrarte"
        element={
          <LayoutGeneral>
            <GeneralGraciasPorRegistrarte />
          </LayoutGeneral>
        }
      />
      <Route
        path="/recuperar-contrasena"
        element={
          <LayoutGeneral>
            <GeneralRecuperarContrasena />
          </LayoutGeneral>
        }
      />
      <Route
        path="/verificar"
        element={
          <LayoutGeneral>
            <GeneralVerificar />
          </LayoutGeneral>
        }
      />

      {/* RUTAS SEMIPRIVADAS */}
      <Route
        path="/registrar"
        element={
          <RutaSemiPrivada
            layout={LayoutGeneral}
            component={GeneralRegistrar}
          />
        }
      />

      <Route
        path="/ingresar/administrador"
        element={
          <LayoutGeneral>
            <GeneralIngresarAdministrador />
          </LayoutGeneral>
        }
      />

      {/* RUTAS CLIENTE */}
      <Route
        path="/cliente/perfil"
        element={
          <RutaCliente>
            <LayoutCliente>
              <ClientePerfil />
            </LayoutCliente>
          </RutaCliente>
        }
      />

      {/* RUTAS ADMINISTRADOR */}
      <Route
        path="/administrador/reportes"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorReportes}
          />
        }
      />

      <Route
        path="/administrador/categorias"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorCategorias}
          />
        }
      />
      <Route
        path="/administrador/categoria-crear"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorCategoriasCrear}
          />
        }
      />
      <Route
        path="/administrador/categoria-editar/:id"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorCategoriasEditar}
          />
        }
      />
      <Route
        path="/administrador/modelos"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorEtiquetas}
          />
        }
      />
      <Route
        path="/administrador/productos"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorProductos}
          />
        }
      />
      <Route
        path="/administrador/producto-crear"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorProductosCrear}
          />
        }
      />
      <Route
        path="/administrador/producto-editar/:id"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorProductosEditar}
          />
        }
      />
      <Route
        path="/administrador/personales"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorPersonales}
          />
        }
      />
      <Route
        path="/administrador/pedidos"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorPedidos}
          />
        }
      />
      <Route
        path="/administrador/clientes"
        element={
          <RutaAdministrador
            layout={LayoutAdministracion}
            component={AdmnistradorClientes}
          />
        }
      />

      {/* RUTAS NO ENCONTRADAS */}
      <Route
        path="/pagina-no-encontrada"
        element={
          <SinLayout>
            <Pagina404 />
          </SinLayout>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-no-encontrada" />} />
    </Routes>
  );
};

export default RoutesComponent;

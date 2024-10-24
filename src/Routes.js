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
  GeneralIngresarAdministrador, // Verificar que esta importación esté correcta
  ClientePerfil,
  AdmnistradorReportes,
  AdmnistradorCategorias,
  AdmnistradorCategoriasCrear,
  AdmnistradorCategoriasEditar,
  AdmnistradorEtiquetas,
  AdmnistradorProductos,
  AdmnistradorProductosCrear,
  AdmnistradorProductosEditar,
  AdmnistradorPersonales,
  AdmnistradorPedidos,
  AdmnistradorClientes,
} from "./pages";

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
            component={GeneralRegistrar}
            layout={LayoutGeneral}
          />
        }
      />

      {/* RUTAS CLIENTE */}
      <Route
        path="/cliente/perfil"
        element={<RutaCliente layout={LayoutCliente} component={ClientePerfil} />}
      />

      {/* RUTAS ADMINISTRADOR */}
      <Route
        path="/administrador/reportes"
        element={
          <RutaAdministrador
            component={AdmnistradorReportes}
            layout={LayoutAdministracion}
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
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  LayoutAdministracion,
  LayoutCliente,
  LayoutGeneral,
} from "./layout/conLayout";
import SinLayout from "./layout/SinLayout/SinLayout";
import {
  AdmnistradorCategorias, // Manteniendo la escritura original
  AdmnistradorCategoriasCrear, // Manteniendo la escritura original
  AdmnistradorCategoriasEditar, // Manteniendo la escritura original
  AdmnistradorClientes,
  // Manteniendo la escritura original
  AdmnistradorEtiquetas, // Manteniendo la escritura original
  AdmnistradorPedidos, // Manteniendo la escritura original
  AdmnistradorPersonales, // Manteniendo la escritura original
  AdmnistradorProductos, // Manteniendo la escritura original
  AdmnistradorProductosCrear, // Manteniendo la escritura original
  AdmnistradorProductosEditar,
  AdmnistradorReportes,
  ClienteCompras,
  ClienteConfirmacion,
  ClientePerfil,
  GeneralCheckout,
  GeneralGraciasPorRegistrarte,
  GeneralIngresar,
  GeneralIngresarAdministrador,
  GeneralInicio,
  GeneralRecuperarContrasena,
  GeneralRegistrar,
  GeneralVerificar,
  Pagina404
} from "./pages"; // Asegúrate de que estos componentes están correctamente exportados en "./pages"
import Tailwind from './pages/Tailwind/Tailwind'; // Importar la página Tailwind
import { RutaAdministrador, RutaCliente, RutaSemiPrivada } from "./router";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}A
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

      {/* Agregar la ruta para la página Tailwind */}
      <Route
        path="/tailwind"  // Ruta a la página Tailwind
        element={<Tailwind />}  // Componente Tailwind
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
          <RutaCliente component={ClientePerfil} layout={LayoutCliente} />
        }
      />

      <Route
        path="/cliente/confirmacion"
        element={
          <LayoutCliente>
            <ClienteConfirmacion />
          </LayoutCliente>
        }
      />

      <Route
        path="/cliente/mis-compras"
        element={
          <LayoutCliente>
            <ClienteCompras />
          </LayoutCliente>
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

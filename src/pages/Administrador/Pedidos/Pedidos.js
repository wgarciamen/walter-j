import React, { useState, useEffect } from "react";
import { db } from "../../../db/firebase";
import {
  collectionGroup,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { pedidoEditar } from "../../../controllers/Pedidos";
import * as XLSX from "xlsx"; // Cambiado a xlsx
import "./Pedidos.css";

// Definición de la función exportToExcel
const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosExcel, setPedidosExcel] = useState([]); // Este estado se usa para la exportación a Excel
  const [cambiar, setCambiar] = useState(false);

  // Función para exportar a Excel
  const exportToExcel = () => { // Cambiado para definir exportToExcel dentro del componente
    if (pedidosExcel.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(pedidosExcel); // Usar el estado pedidosExcel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
    XLSX.writeFile(workbook, "Listado_de_pedidos.xlsx");
  };

  useEffect(() => {
    const pedidosRef = collectionGroup(db, "Pedidos");
    const queryPedidos = query(pedidosRef, orderBy("Fecha", "desc"));
    onSnapshot(queryPedidos, (snapshot) => {
      setPedidos(
        snapshot.docs.map((doc) => ({
          IdPedido: doc.id,
          ...doc.data(),
        }))
      );
    });
    setCambiar(true);
  }, [setCambiar]);

  useEffect(() => {
    if (cambiar) {
      const cambiadoExcel = pedidos.map((doc) => {
        const arregloProductos = doc.Productos.map((producto) => {
          return producto.Nombre;
        });
        const juntarProductos = arregloProductos.toString();
        Object.assign(doc, { Productos2: juntarProductos });
        return {
          IdPedido: doc.id,
          Fecha2: doc.Fecha.toDate().toLocaleDateString(),
          ...doc,
        };
      });
      setPedidosExcel(cambiadoExcel);
    }
  }, [cambiar, pedidos]);

  const cambiarRuta = (IdCliente, IdPedido) => {
    const estado = "ruta";
    pedidoEditar(IdCliente, IdPedido, estado);
  };
  
  const cambiarPedido = (IdCliente, IdPedido) => {
    const estado = "pedido";
    pedidoEditar(IdCliente, IdPedido, estado);
  };
  
  const cambiarEntregado = (IdCliente, IdPedido) => {
    const estado = "entregado";
    pedidoEditar(IdCliente, IdPedido, estado);
  };

  return (
    <>
      <h2>Pedidos</h2>
      {pedidos?.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <>
          {pedidosExcel?.length !== 0 && (
            <div>
              <button className="boton-mediano" onClick={exportToExcel}>
                Descargar excel
              </button>
            </div>
          )}
          {pedidos.map((pedido) => (
            <div key={pedido.IdPedido} className="contenedor-pedido">
              <div className="titulo-pedido">
                <div>
                  <p>N° Pedido: {pedido.NumeroPedido}</p>
                  <span>|</span>
                  <p>Fecha: {pedido.Fecha.toDate().toLocaleDateString()}</p>
                  <span>|</span>
                  <p style={{ fontWeight: "700" }}>
                    Monto total: S/. {pedido.Total}.00{" "}
                  </p>
                </div>
                <div>
                  <button
                    style={
                      pedido.Estado === "pedido"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "black" }
                    }
                    onClick={() =>
                      cambiarPedido(pedido.IdCliente, pedido.IdPedido)
                    }
                  >
                    Pedido
                  </button>
                  <button
                    style={
                      pedido.Estado === "ruta"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "black" }
                    }
                    onClick={() =>
                      cambiarRuta(pedido.IdCliente, pedido.IdPedido)
                    }
                  >
                    Ruta
                  </button>
                  <button
                    style={
                      pedido.Estado === "entregado"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "black" }
                    }
                    onClick={() =>
                      cambiarEntregado(pedido.IdCliente, pedido.IdPedido)
                    }
                  >
                    Entregado
                  </button>
                </div>
              </div>
              <div className="productos-pedido">
                {pedido.Productos.map((producto) => (
                  <div
                    key={producto.IdProducto}
                    style={{ marginBottom: "5px" }}
                  >
                    <img src={producto.ImagenesUrl[0]} alt="" />
                    <p>{producto.Nombre}</p>
                    <span>|</span>
                    <p>Cantidad: {producto.Unidades}</p>
                    <span>|</span>
                    <p style={{ fontWeight: "700" }}>
                      Precio: S/. {producto.Precio}.00{" "}
                    </p>{" "}
                  </div>
                ))}
              </div>
              <hr />
              <div style={{ padding: "8px" }}>
                <label>Destinatario: </label>
                <span>{pedido.Nombres + pedido.Apellidos}</span>
                <br />
                <label>Celular: </label>
                <span>{pedido.Celular ? pedido.Celular : ""}</span>
                <br />
                {typeof pedido.Direccion === "object" ? (
                  <>
                    <hr />

                    <p
                      style={{
                        padding: "5px 0px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Producto enviado a tu dirección
                    </p>
                    <hr />
                    <label>Región: </label>
                    <span>{pedido.Direccion.region}</span>
                    <br />
                    <label>Provincia: </label>
                    <span>{pedido.Direccion.provincia}</span>
                    <br />
                    <label>Distrito: </label>
                    <span>{pedido.Direccion.distrito}</span>
                    <br />
                    <label>Dirección: </label>
                    <span>{pedido.Direccion.direccion}</span>
                    <br />
                    <label>Recomendación de envio: </label>
                    <span>{pedido.Direccion.recomendacion}</span>
                  </>
                ) : (
                  <>
                    <hr />

                    <p
                      style={{
                        padding: "5px 0px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Producto para recoger en Tienda Logan
                    </p>
                    <hr />
                    <label>Dirección tienda LOGAN: </label>
                    <span>{pedido.Direccion}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}{" "}
    </>
  );
};

export default Pedidos;

/*
onSnapshot(queryPedidos, (snapshot) => {
      setPedidos(
        snapshot.docs.map((doc) => ({

          IdPedido: doc.id,
          ...doc.data(),
        }))
      );
    });

*/

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { carritoTraerUno } from "../../../controllers/Carrito";

let functionsPagarMP =
  "http://127.0.0.1:5001/ecomers-walter/us-central1/creaPagoMP";
//let functionsPagarMP = "http://localhost:5001/ecommerce-logan-29604/us-central1/creaPagoMP";

const Confirmacion = () => {
  const navigate = useNavigate(); // Reemplazamos useHistory por useNavigate
  const [compraExitosa, setCompraExitosa] = useState("esperando");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let payment_id = query.get("payment_id");
  let status = query.get("status");
  const idCliente = localStorage.getItem("IdCliente");

  useEffect(() => {
    (async () => {
      if (payment_id !== null && status === "approved") {
        const carritoDB = await carritoTraerUno(idCliente);
        const pedido = {
          payment_id: payment_id,
          status: status,
          carritoDB: carritoDB,
        };

        const request = await Axios({
          method: "post",
          baseURL: functionsPagarMP,
          data: JSON.stringify(pedido),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000/",
          },
          withCredentials: true,
        });

        if (request.data) {
          setCompraExitosa("comprado");
          setTimeout(() => {
            navigate(`/cliente/mis-compras`); // Usamos navigate en lugar de history.push
          }, 4000);
        } else {
          console.log("No se pudo completar la compra");
          setCompraExitosa("error");
        }
      }
    })();
  }, [payment_id, status, idCliente, navigate]);

  return (
    <>
      <div className="titulo-paginas">
        <h1>CONFIRMACIÓN DEL PEDIDO</h1>
      </div>
      <p>Esperando confirmación de la compra:</p>
      {compraExitosa === "esperando" && <h3>Procesando....</h3>}
      {compraExitosa === "comprado" && <h3>Gracias por comprar</h3>}
      {compraExitosa === "error" && <h3>Error en la compra</h3>}
    </>
  );
};

export default Confirmacion;

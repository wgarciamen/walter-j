import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  TablaConversion,
  TablaNivelEficacia,
} from "../../../components/Tablas";
import { db } from "../../../db/firebase";
import GraficoBarrasEficacia from "./GraficoBarrasEficacia";
import GraficoBarrasVisitas from "./GraficoBarrasVisitas";

import {
  clientesTotal,
  pedidosTotal,
  productosTotal,
  ventasTotal,
} from "../../../controllers/Reportes";

import "./Reportes.css";

const Reportes = () => {
  const [productos, setProductos] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [pedidos, setPedidos] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalVisitas, setVisitas] = useState(0);
  const [pedidosIndicador, setPedidosIndicador] = useState([]);
  const [pedidosIndicadorFiltrado, setPedidosIndicadorFiltrado] = useState([]);
  const [visitasIndicador, setVisitasIndicador] = useState([]);
  const [visitasIndicadorFiltrado, setVisitasIndicadorFiltrado] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaInicioIndice, setFechaInicioIndice] = useState(-1);
  const [fechaFin, setFechaFin] = useState("");
  const [fechaFinIndice, setFechaFinIndice] = useState(-1);
  useEffect(() => {
    (async () => {

      try {
        const totalProductos = await productosTotal();
        setProductos(totalProductos);
        const totalClientes = await clientesTotal();
        setClientes(totalClientes);
        const totalPedidos = await pedidosTotal();
        setPedidos(totalPedidos);
        const totalVentas = await ventasTotal();
        setTotal(totalVentas);
      } catch (error) {
        
      }

    })();
  }, []);
  useEffect(() => {
    (async () => {

      try {
        const pedidosRef = collectionGroup(db, "Pedidos");
        const queryPedidos = query(pedidosRef, orderBy("Fecha", "desc"));
        const consultaPedidos = await getDocs(queryPedidos);
        const resultado = consultaPedidos?.docs?.map((doc) => ({
          IdPedido: doc?.id,
          Fecha: doc?.data()?.Fecha?.toDate()?.toLocaleDateString("en-GB"),
          Venta: 1,
        }));
  
        const agrupandoFechas = resultado?.reduce((groups, item) => {
          var val = item["Fecha"];
          groups[val] = groups[val] || {
            Fecha: item.Fecha,
            Venta: 0,
          };
          groups[val].Venta += item.Venta;
          return groups;
        }, {});
  
        setPedidosIndicador(Object.values(agrupandoFechas));
      } catch (error) {
        console.log(error)
      }
     
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const visitasRef = collection(db, "Visitas");
        const queryVisitas = query(visitasRef, orderBy("Fecha", "desc"));
        const visitasDB = await getDocs(queryVisitas);
        var sumaTotalVisitas = 0;
        const resultadoVisitas = visitasDB.docs.map((doc) => {
          sumaTotalVisitas += doc.data().Cantidad;
          return {
            Fecha: doc.data().Fecha.toDate().toLocaleDateString("en-GB"),
            Cantidad: doc.data().Cantidad,
          };
        });
        setVisitas(sumaTotalVisitas);
        const resultadoCombinar = pedidosIndicador.filter((eficacia) => {
          const filtrarIndicadorJuntar = [];
          resultadoVisitas.filter((tasa) => {
            if (eficacia.Fecha === tasa.Fecha) {
              const finalResult = Object.assign(eficacia, tasa);
              filtrarIndicadorJuntar.push(finalResult);
            }
            return true;
          });
          return filtrarIndicadorJuntar;
        });
        setVisitasIndicador(resultadoCombinar);
      } catch (error) {
        
      }
     
    })();
  }, [pedidosIndicador]);

  const cambiarDatosInicio = (e) => {
    const valueFormatoInicio = e.target.value.split("-").reverse().join("/");
    const indiceFechaInicio = pedidosIndicador.findIndex(
      (inicio) => inicio.Fecha === valueFormatoInicio,
    );
    setFechaInicio(valueFormatoInicio);
    setFechaInicioIndice(indiceFechaInicio);
  };

  const cambiarDatosFin = (e) => {
    const valueFormatoFin = e.target.value.split("-").reverse().join("/");
    const indiceFechaFin = pedidosIndicador.findIndex(
      (fin) => fin.Fecha === valueFormatoFin,
    );
    setFechaFin(valueFormatoFin);
    setFechaFinIndice(indiceFechaFin);
  };

  const filtrarRangoFecha = (e) => {
    e.preventDefault();
    const rangoFechaPedidos = pedidosIndicador.slice(
      fechaFinIndice,
      fechaInicioIndice + 1,
    );
    const rangoFechaVisitas = visitasIndicador.slice(
      fechaFinIndice,
      fechaInicioIndice + 1,
    );
    if (rangoFechaPedidos.length !== 0 && rangoFechaVisitas.length !== 0) {
      setPedidosIndicadorFiltrado(rangoFechaPedidos);
      setVisitasIndicadorFiltrado(rangoFechaVisitas);
    }
  };

  return (
    <>
      <div className="contenedor-reportes-card">
        <div className="card-reporte" style={{ backgroundColor: "red" }}>
          <h6>VENTAS</h6>
          <h3>S/.{total}.00</h3>
        </div>
        <div className="card-reporte" style={{ backgroundColor: "black" }}>
          <h6>PEDIDOS</h6>
          <h3>{pedidos}</h3>
        </div>
        <div className="card-reporte" style={{ backgroundColor: "red" }}>
          <h6>VISITAS</h6>
          <h3>{totalVisitas}</h3>
        </div>
        <div className="card-reporte" style={{ backgroundColor: "black" }}>
          <h6>PRODUCTOS</h6>
          <h3>{productos}</h3>
        </div>
        <div className="card-reporte" style={{ backgroundColor: "red" }}>
          <h6>CLIENTES</h6>
          <h3>{clientes}</h3>
        </div>
      </div>
      <div>
        <div>
          <form onSubmit={filtrarRangoFecha}>
            <label htmlFor="fechaInicio">Fecha inicio:</label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              required
              value={fechaInicio.split("/").reverse().join("-")}
              onChange={cambiarDatosInicio}
            />
            <label htmlFor="fechaFin">Fecha fin:</label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              required
              value={fechaFin.split("/").reverse().join("-")}
              onChange={cambiarDatosFin}
            />
            <input
              className={"boton-formulario"}
              type="submit"
              value="Filtrar rango fecha"
            />
          </form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <h3>Reporte de nivel de eficacia</h3>
        </div>
        {pedidosIndicador?.length === 0 ? (
          <p>No hay resultados</p>
        ) : (
          <>
            <TablaNivelEficacia
              pedidos={
                pedidosIndicadorFiltrado.length !== 0
                  ? pedidosIndicadorFiltrado
                  : pedidosIndicador
              }
            />
            {pedidosIndicadorFiltrado?.length !== 0 && (
              <GraficoBarrasEficacia pedidos={pedidosIndicadorFiltrado} />
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <h3>Reporte de tasa de conversión</h3>
            </div>
            <TablaConversion
              visitas={
                visitasIndicadorFiltrado.length !== 0
                  ? visitasIndicadorFiltrado
                  : visitasIndicador
              }
            />
            {visitasIndicadorFiltrado?.length !== 0 && (
              <GraficoBarrasVisitas visitas={visitasIndicadorFiltrado} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Reportes;

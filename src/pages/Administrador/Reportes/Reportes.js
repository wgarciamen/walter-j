import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { db } from "../../../db/firebase";
import "./Reportes.css";

const Reportes = () => {
  const [productos, setProductos] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [pedidos, setPedidos] = useState(0);
  const [total, setTotal] = useState(0);
  const [visitas, setVisitas] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    actualizarDatos();
  }, []);

  const actualizarDatos = async () => {
    try {
      const hoy = new Date();
      const fechaInicio = new Date(hoy.setMonth(hoy.getMonth() - 1)); // Último mes

      // Obtener pedidos
      const pedidosRef = collection(db, "Pedidos");
      const pedidosQuery = query(
        pedidosRef,
        where("Fecha", ">=", fechaInicio),
        orderBy("Fecha", "asc")
      );
      const pedidosSnapshot = await getDocs(pedidosQuery);
      const datosPedidos = [];
      pedidosSnapshot.forEach((doc) => {
        const fecha = doc.data().Fecha.toDate(); // Aseguramos que es un objeto Date
        datosPedidos.push(fecha);
      });

      // Agrupar pedidos por semanas
      const pedidosPorSemana = agruparPorSemanas(datosPedidos);

      // Datos simulados de visitas (puedes reemplazarlos con datos reales)
      const visitasSimuladas = [
        { semana: "Semana 1", cantidad: 15 },
        { semana: "Semana 2", cantidad: 8 },
        { semana: "Semana 3", cantidad: 5 },
        { semana: "Semana 4", cantidad: 12 },
      ];

      const datosGrafico = [["Semana", "Pedidos", "Visitas"]];
      pedidosPorSemana.forEach((pedidosSemana, index) => {
        const visitasSemana = visitasSimuladas[index]?.cantidad || 0;
        datosGrafico.push([`Semana ${index + 1}`, pedidosSemana, visitasSemana]);
      });

      console.log("Datos del gráfico:", datosGrafico); // Verificar datos en consola
      setChartData(datosGrafico);

      // Actualizar métricas adicionales
      setPedidos(datosPedidos.length);
      setVisitas(visitasSimuladas.reduce((acc, curr) => acc + curr.cantidad, 0));
      setProductos(await productosTotal());
      setClientes(await clientesTotal());
      setTotal(await ventasTotal());
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  };

  const agruparPorSemanas = (fechas) => {
    const semanas = [0, 0, 0, 0]; // Cuatro semanas
    fechas.forEach((fecha) => {
      const semana = Math.ceil(fecha.getDate() / 7); // Calcular la semana
      semanas[semana - 1] += 1; // Incrementar el contador de esa semana
    });
    return semanas;
  };

  const chartOptions = {
    title: "Ventas por semana del último mes",
    hAxis: { title: "Semanas" },
    vAxis: { title: "Cantidad" },
    legend: { position: "bottom" },
    colors: ["#FF0000", "#000000"], // Colores para pedidos y visitas
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="titulo-dashboard">Dashboard de Reportes</h2>
      <div className="contenedor-reportes-card">
        <div className="card-reporte">
          <h6>Ventas</h6>
          <h3>S/.{total}.00</h3>
        </div>
        <div className="card-reporte">
          <h6>Pedidos</h6>
          <h3>{pedidos}</h3>
        </div>
        <div className="card-reporte">
          <h6>Visitas</h6>
          <h3>{visitas}</h3>
        </div>
        <div className="card-reporte">
          <h6>Productos</h6>
          <h3>{productos}</h3>
        </div>
        <div className="card-reporte">
          <h6>Clientes</h6>
          <h3>{clientes}</h3>
        </div>
      </div>

      <div className="google-visualization-chart">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default Reportes;

// Funciones simuladas para datos adicionales
async function productosTotal() {
  return 10; // Simulación
}
async function clientesTotal() {
  return 5; // Simulación
}
async function ventasTotal() {
  return 500; // Simulación
}

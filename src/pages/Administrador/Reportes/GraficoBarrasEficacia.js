import React from "react";
import { Bar } from "react-chartjs-2";
// Eliminado ReactExport y reemplazado por xlsx
import * as XLSX from "xlsx"; // <-- Nuevo import para usar xlsx

const GraficoBarrasEficacia = ({ pedidos }) => {
  const pedidosReversa = pedidos.map(pedidos.pop, [...pedidos]);
  const pieBarra = pedidosReversa.map(({ Fecha }) => Fecha.slice(0, 2));
  const dataBarra = pedidosReversa.map(({ Venta }) => Venta * 10);

  const cambiadoExcel2 = pedidosReversa.map((doc) => {
    Object.assign(doc, { VentasEsperadas: 10 });
    Object.assign(doc, { NivelEficacia: (doc.Venta / 10) * 100 });
    return {
      ...doc,
    };
  });

  const labels = pieBarra;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Nivel de eficacia",
        backgroundColor: "black",
        data: dataBarra,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Tabla Nivel de Eficacia",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || "";
            if (context.parsed.y !== null) {
              label += " " + context.parsed.y + "%";
            }
            return label;
          },
        },
      },
    },

    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function (value, index, values) {
            return value + " %";
          },
        },
      },
    },
  };

  // Nueva función para exportar a Excel utilizando xlsx
  const exportToExcel = () => { // <-- Nueva función agregada para manejar la exportación de Excel
    const worksheet = XLSX.utils.json_to_sheet(cambiadoExcel2);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nivel Eficacia");
    XLSX.writeFile(workbook, "Listado_de_nivel_de_eficacia.xlsx");
  };

  return (
    <div className="contenedor-reportes-barras">
      <Bar data={data} options={options} />
      <button
        className="boton-mediano"
        style={{ color: "white" }}
        onClick={exportToExcel} // <-- Cambiado para usar la nueva función exportToExcel
      >
        Descargar excel
      </button>
    </div>
  );
};

export default GraficoBarrasEficacia;

import React from "react";
import { Bar } from "react-chartjs-2";
// Cambiado para usar xlsx en lugar de react-export-excel
import * as XLSX from "xlsx"; // Nuevo import para xlsx

const GraficoBarrasVisitas = ({ visitas }) => {
  const visitasReversa = visitas.map(visitas.pop, [...visitas]);
  const pieBarra = visitasReversa.map(({ Fecha }) => Fecha.slice(0, 2));
  const dataBarra = visitasReversa.map(({ Venta, Cantidad }) =>
    ((Venta / Cantidad) * 100).toFixed(2)
  );

  const cambiadoExcel3 = visitasReversa.map((doc) => {
    Object.assign(doc, {
      TasaConversion: ((doc.Venta / doc.Cantidad) * 100).toFixed(2),
    });
    return {
      ...doc,
    };
  });

  const labels = pieBarra;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tasa de conversión",
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
        text: "Tabla Tasa de Conversión",
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
          callback: function (value) {
            return value + " %";
          },
        },
      },
    },
  };

  // Función para exportar a Excel utilizando xlsx
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(cambiadoExcel3); // Convertir datos a hoja de cálculo
    const workbook = XLSX.utils.book_new(); // Crear nuevo libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasa de conversión"); // Añadir hoja al libro
    XLSX.writeFile(workbook, "Listado_de_tasa_de_conversion.xlsx"); // Guardar archivo
  };

  return (
    <div className="contenedor-reportes-barras">
      <Bar data={data} options={options} />
      {/* Botón para descargar el archivo Excel */}
      <button
        className="boton-mediano"
        style={{ color: "white" }}
        onClick={exportToExcel} // Cambio para usar la función de xlsx
      >
        Descargar excel
      </button>
    </div>
  );
};

export default GraficoBarrasVisitas;

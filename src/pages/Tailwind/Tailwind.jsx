import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
       
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Usuarios
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Productos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Pedidos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Configuración
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Cerrar Sesión
          </button>
        </header>

        {/* Tarjetas de Métricas */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600 font-bold">Usuarios</h2>
            <p className="text-2xl font-semibold text-gray-800">1,200</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600 font-bold">Pedidos</h2>
            <p className="text-2xl font-semibold text-gray-800">320</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600 font-bold">Ganancias</h2>
            <p className="text-2xl font-semibold text-gray-800">$12,300</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600 font-bold">Productos</h2>
            <p className="text-2xl font-semibold text-gray-800">85</p>
          </div>
        </section>

        {/* Gráfico de Ejemplo */}
        <section className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-gray-700 font-bold mb-4">Estadísticas</h2>
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            {/* Aquí puedes integrar un gráfico usando librerías como Chart.js */}
            <p className="text-gray-500">Gráfico de ejemplo (usa Chart.js)</p>
          </div>
        </section>

        {/* Tabla */}
        <section className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-bold mb-4">Últimos Pedidos</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  ID Pedido
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Cliente
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Monto
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">#001</td>
                <td className="border border-gray-300 px-4 py-2">Juan Pérez</td>
                <td className="border border-gray-300 px-4 py-2">$100</td>
                <td className="border border-gray-300 px-4 py-2 text-green-500">
                  Completado
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">#002</td>
                <td className="border border-gray-300 px-4 py-2">Ana López</td>
                <td className="border border-gray-300 px-4 py-2">$250</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-500">
                  Pendiente
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">#003</td>
                <td className="border border-gray-300 px-4 py-2">Carlos Gómez</td>
                <td className="border border-gray-300 px-4 py-2">$75</td>
                <td className="border border-gray-300 px-4 py-2 text-red-500">
                  Cancelado
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;



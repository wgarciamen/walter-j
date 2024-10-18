import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  collectionGroup,
  where
} from "firebase/firestore";
import { db } from "../db/firebase";
const coleccion = "Clientes";
const subColeccion = "Pedidos";

// Función para obtener todos los pedidos de un cliente
export const pedidosTodos = async (IdCliente) => {
  const pedidosRef = collection(db, coleccion, IdCliente, subColeccion);
  const queryPedidos = query(pedidosRef, orderBy("Fecha", "desc"));
  const pedidosDB = await getDocs(queryPedidos);
  const resultado = pedidosDB.docs.map((doc) => ({
    IdPedido: doc.id,
    ...doc.data(),
  }));
  return resultado;
};

// Función para crear un nuevo pedido
export const pedidoCrear = async (carritoDB) => {
  // Corrección: Verificación de que los datos requeridos estén presentes
  if (!carritoDB || !carritoDB.IdCliente || !carritoDB.Productos) {
    console.error("Datos incompletos para crear el pedido.");
    return;
  }

  const idPedido = `00 + ${Date.now()}`;
  const rrutaPedido = `${coleccion}/${carritoDB.IdCliente}/${subColeccion}`;
  const pedidosRef = doc(db, rrutaPedido, idPedido); 
  try {
    await addDoc(pedidosRef, {
      Total: carritoDB.Total,
      Productos: carritoDB.Productos,
      Direccion: carritoDB.Direccion,
      Fecha: new Date(),
      IdCliente: carritoDB.IdCliente,
      Nombres: carritoDB.Nombres,
      Apellidos: carritoDB.Apellidos,
      Correo: carritoDB.Correo,
      Celular: carritoDB.Celular,
      Estado: "pedido",
      NumeroPedido: idPedido,
    });
    console.log("PEDIDO AGREGADO ");
  } catch (e) {
    console.error("No se pudo crear el pedido ", e);
  }
};

// Función para obtener todos los pedidos (función general)
export const pedidosGeneral = async () => {
  const pedidosRef = collectionGroup(db, "Pedidos");
  const pedidosDB = await getDocs(pedidosRef);
  var pedidosArray = [];
  pedidosDB.forEach((doc) => {
    pedidosArray.push({ IdPedido: doc.id, ...doc.data() });
  });

  // Corrección: Verificación de que el array no esté vacío
  if (pedidosArray.length > 0) {
    return pedidosArray;  // Retorna el array de pedidos si tiene elementos
  } else {
    console.log("No se encontraron pedidos.");
    return [];  // Devuelve un array vacío si no hay pedidos
  }
};

// Función para editar el estado de un pedido
export const pedidoEditar = async (IdCliente, IdPedido, estado) => {
  const rrutaFavorito = `${coleccion}/${IdCliente}/${subColeccion}`;
  const favoritosRef = doc(db, rrutaFavorito, IdPedido);
  await updateDoc(favoritosRef, {
    Estado: estado,
  });
};

// Función para obtener un pedido por su número de pedido
export const pedidoUno = async (numeroPedido) => {
  const pedidosRef = collectionGroup(db, "Pedidos");
  const pedidosDB = await getDocs(pedidosRef);
  var pedidosArray = [];
  pedidosDB.forEach((doc) => {
    pedidosArray.push({ IdPedido: doc.id, ...doc.data() });
  });
  const unPedido = pedidosArray.filter(pedido => pedido.IdPedido === numeroPedido);

  // Corrección: Verificación de que el array no esté vacío
  if (unPedido.length > 0) {
    return unPedido[0];  // Retorna el primer elemento si existe
  } else {
    console.log("No se encontró el pedido con ese número.");
    return null;  // Devuelve null si no hay coincidencias
  }
};

// Función para obtener un pedido específico usando el número de pedido
export const pedidoUnoIgual = async (numeroPedido) => {
  const pedidosRef = collectionGroup(db, "Pedidos");
  const queryPedido = query(pedidosRef, where('NumeroPedido', '==', numeroPedido)) 
  const pedidosDB = await getDocs(queryPedido);
  var pedidosArray = [];
  pedidosDB.forEach((doc) => {
    pedidosArray.push({ IdPedido: doc.id, ...doc.data() });
  });

  // Corrección: Verificación de que el array no esté vacío
  if (pedidosArray.length > 0) {
    return pedidosArray[0];  // Retorna el primer elemento si existe
  } else {
    console.log("No se encontró el pedido con ese número.");
    return null;  // Devuelve null si no hay coincidencias
  }
};

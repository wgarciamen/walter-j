// Importa las bibliotecas necesarias
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {WebhookClient, Payload} = require("dialogflow-fulfillment");

// Inicializa la aplicación de Firebase
admin.initializeApp();
const db = admin.firestore();

// Función creaPago (sin MercadoPago)
exports.creaPago = functions.https.onRequest((req, res) => {
  res.send("Hello from creaPago!");
});

/**
 * Consulta el estado del pedido por número de pedido.
 * @param {object} agent - Objeto del WebhookClient de Dialogflow.
 * @return {Promise<void>} - Una promesa que se resuelve cuando se completa la consulta del pedido.
 */
function consultarPedido(agent) {
  const idPedido = agent.parameters.TipoNumeroPedido;

  if (idPedido) {
    const pedidosRef = db.collectionGroup("Pedidos").where("NumeroPedido", "==", idPedido);

    return pedidosRef
      .get()
      .then((querySnapshot) => {
        const pedidosArray = [];
        querySnapshot.forEach((doc) => {
          pedidosArray.push({IdPedido: doc.id, ...doc.data()});
        });

        if (pedidosArray.length > 0) {
          agent.add(`Hola: ${pedidosArray[0].Nombres}`);
          agent.add(`El estado de tu pedido es: ${pedidosArray[0].Estado}`);
          agent.add("Compraste estos productos:");

          const productosArray = pedidosArray[0].Productos.map((producto) => {
            return {
              text: producto.Nombre,
              link: producto.UrlProducto,
              image: {
                src: {
                  rawUrl: producto.ImagenesUrl[0],
                },
              },
            };
          });

          const payload = {
            richContent: [
              [
                {
                  type: "chips",
                  options: productosArray,
                },
              ],
            ],
          };
          agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
              rawPayload: true,
              sendAsMessage: true,
            }),
          );
          agent.add(`En la fecha: ${pedidosArray[0].Fecha.toDate().toLocaleDateString()}`);
          agent.add(`Espero haberte ayudado: ${pedidosArray[0].Nombres}`);
        } else {
          agent.add("No se encontró ningún pedido con el número proporcionado.");
        }
      })
      .catch((error) => {
        console.error("Error al consultar el pedido:", error);
        agent.add("Ocurrió un error al consultar el pedido. Intenta de nuevo más tarde.");
      });
  } else {
    agent.add("Ingresa tu número de pedido correctamente.");
  }
}

// Mapa de intenciones y manejo del chatbot
exports.chatbot = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request, response});
  const intentMap = new Map(); // Usa 'const' para el intentMap
  intentMap.set("ConsultarPedido", consultarPedido);
  agent.handleRequest(intentMap);
});

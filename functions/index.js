const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: ["http://localhost:5001", "http://localhost:3000"],
  methods: ["POST"],
  credentials: true,
});

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "APP_USR-1250593922113004-110818-1a81b371446806e3449e3a9b051a3e89-2087266204",
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://ecomers-walter.firebaseio.com",
});

exports.crearIdMP = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const listItems = req.body;
    const productosEnviar = listItems.map((item) => ({
      title: item.Nombre,
      unit_price: parseFloat(item.Precio),
      quantity: item.Unidades,
    }));

    const preference = {
      items: productosEnviar,
      back_urls: {
        success: "http://localhost:3000/cliente/confirmacion",
        failure: "http://localhost:3000/cliente/error",
        pending: "http://localhost:3000/",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then((response) => {
          console.log("REDIRECT BACKEND:", response.body);
          res.set("Access-Control-Allow-Origin", "http://localhost:3000");
          res.set("Access-Control-Allow-Methods", "POST");
          res.set("Access-Control-Allow-Headers", "Content-Type");
          res.set("Access-Control-Max-Age", "3600");
          res.set("Access-Control-Allow-Credentials", "true");

          return res.status(200).send({
            id: response.body.id,
            url: response.body.init_point,
            urlSandbox: response.body.sandbox_init_point,
          });
        })
        .catch((error) => {
          console.log("Error:", error);
          return res.status(500).send(error);
        });
  }); // Cierra el bloque `cors`
}); // Cierra el bloque `exports.crearIdMP`

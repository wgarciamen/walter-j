// pages/General/Entrar/Registrar.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Uso de `useNavigate` para la navegación
import { registrarClienteAuth } from "../../../controllers/Sesion";  // Ruta correcta a la función
import "./Registrar.css";  // Ruta correcta para el CSS

const Registrar = () => {
  const [formRegistrar, setFormRegistrar] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
  });

  const navigate = useNavigate();  // Inicializa el hook `useNavigate`

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormRegistrar({
      ...formRegistrar,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registrarClienteAuth(formRegistrar).then((res) => {
      if (res === "Correcto") {
        console.log("Registrado correctamente");
        navigate("/gracias-por-registrarte");
      } else if (res === "Repetido") {
        console.log("Correo ya registrado");
        navigate("/ingresar");
      } else if (res === "Contrasena") {
        console.log("Contraseña debe ser mayor de 6 dígitos");
      } else {
        console.log("Error desconocido o no manejado:", res); // Captura cualquier otro error
      }
    });
    
  };

  return (
    <div className="grid-registro">
      <div className="grid-registro-imagen">
        <img src="/images/sesion/imagenRegistroLogan.jpg" alt="Imagen de registro" />
        <div className="contenedor-registro-imagen">
          <h2>Regístrate y compra tu estilo.</h2>
          <h3>Nickol Sinchi</h3>
          <p>Corazón Serrano</p>
        </div>
      </div>
      <div className="grid-registro-formulario">
        <h2>Registrar</h2>
        <p>Mi cuenta con Facebook</p>
        <button className="grid-registro-facebook">Facebook</button>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="nombres"
            placeholder="Nombres"
            value={formRegistrar.nombres}
            onChange={cambiarDatos}
          />
          <input
            type="text"
            required
            name="apellidos"
            placeholder="Apellidos"
            value={formRegistrar.apellidos}
            onChange={cambiarDatos}
          />
          <input
            type="email"
            required
            name="correo"
            placeholder="Correo"
            value={formRegistrar.correo}
            onChange={cambiarDatos}
          />
          <input
            type="password"
            required
            name="contrasena"
            placeholder="Contraseña"
            value={formRegistrar.contrasena}
            onChange={cambiarDatos}
          />
          <p>
            Al registrarse usted autoriza recibir comunicaciones promocionales
            y el uso de su información para fines adicionales.
          </p>
          <p>
            También declara que leyó y aceptó la
            <a href="/politica-de-privacidad"> Política de Privacidad</a> y los
            <a href="/terminos-y-condiciones"> Términos y Condiciones</a>.
          </p>
          <input type="submit" value="Registrar" />
          <p>
            Tengo una cuenta, quiero
            <a href="/ingresar"> Ingresar</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registrar;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import {
  ingresarClienteAuth,
  ingresarConFacebook,
  traerUnCliente,
} from "../../../controllers/Sesion";
/* Estado inicial del formulario */
const initFormIngresar = {
  correo: "",
  contrasena: "",
};

const Ingresar = () => {
  const { iniciarSesion } = useContext(EstadoContexto);
  const [formIngresar, setFormIngresar] = useState(initFormIngresar);
  const [usuarioVerificado, setUsuarioVerificado] = useState();
  const navigate = useNavigate();

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormIngresar({
      ...formIngresar,
      [name]: value,
    });
  };

  useEffect(() => {
    if (usuarioVerificado) {
      (async () => {
        const usuarioDB = await traerUnCliente(usuarioVerificado);
        iniciarSesion(usuarioDB);
        navigate("/cliente/perfil");
      })();
    }
  }, [usuarioVerificado, iniciarSesion, navigate]);

  const ingresar = (e) => {
    e.preventDefault();
    ingresarClienteAuth(formIngresar).then((res) => {
      if (res.idUsuario) {
        setUsuarioVerificado(res);
      } else if (res === "noVerificado") {
        console.log("Primero verifica tu correo");
      } else if (res === "contrasenaIncorrecta") {
        console.log("Contraseña Incorrecta");
      } else {
        console.log("Hay un error");
      }
    });
  };

  const ingresarFacebook = (e) => {
    e.preventDefault();
    ingresarConFacebook(formIngresar).then((res) => {
      if (res.idUsuario) {
        setUsuarioVerificado(res);
      } else if (res === "noAccess") {
        console.log("No tiene acceso con Facebook");
      } else if (res === "existe") {
        console.log("Ingrese con su correo y contraseña");
      } else {
        console.log("Hay un error");
      }
    });
  };

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/images/sesion/imagenIngresoLogan.jpg"
            alt="Logo de la empresa"
            className="h-10"
          />
          <div className="rounded-lg border bg-white shadow-sm mx-auto w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6 items-center">
              <h3 className="font-semibold tracking-tight text-xl">
                Inicia sesión con tu cuenta
              </h3>
              <p className="text-sm text-zinc-600">
                Ingresa tus datos para acceder
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={ingresar} className="grid gap-4">
                {/* Botón de Facebook */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-blue-600 text-white hover:bg-blue-500 h-10 px-4 py-2 w-full"
                  onClick={ingresarFacebook}
                >
                  Ingresar con Facebook
                </button>
                <div className="flex items-center gap-4">
                  <span className="h-px w-full bg-gray-100"></span>
                  <span className="text-xs text-zinc-600">O</span>
                  <span className="h-px w-full bg-gray-100"></span>
                </div>
                {/* Campo: Correo */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="correo"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    required
                    value={formIngresar.correo}
                    onChange={cambiarDatos}
                    className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    placeholder="correo@example.com"
                  />
               </div>
                {/* Campo: Contraseña */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="contrasena"
                  >
                    Contraseña
                  </label>
                  <input
                    id="contrasena"
                    name="contrasena"
                    type="password"
                    required
                    value={formIngresar.contrasena}
                    onChange={cambiarDatos}
                    className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    placeholder="********"
                  />
                </div>
                {/* Botón: Ingresar */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 h-10 px-4 py-2 w-full"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
          {/* Enlaces adicionales */}
          <div className="flex gap-1 text-sm">
            <p>¿No tienes cuenta?</p>
            <Link to="/registrar" className="underline">
              Regístrate
            </Link>
          </div>
          <div className="flex gap-1 text-sm">
            <p>¿Olvidaste tu contraseña?</p>
            <Link to="/recuperar-contrasena" className="underline">
              Recuperarla
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ingresar;

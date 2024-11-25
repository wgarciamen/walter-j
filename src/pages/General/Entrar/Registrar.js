import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarClienteAuth } from "../../../controllers/Sesion";

const Registrar = () => {
  const [formRegistrar, setFormRegistrar] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
  });

  const navigate = useNavigate();

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
        console.log("Error desconocido o no manejado:", res);
      }
    });
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <img
            src="/images/placeholders/logos/wicked-icon.svg"
            alt="logo"
            className="h-8"
          />

          {/* Formulario principal */}
          <div className="rounded-lg border bg-white text-gray-900 shadow-sm mx-auto w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6 items-center">
              <h3 className="font-semibold tracking-tight text-xl">
                Crear una cuenta
              </h3>
              <p className="text-sm text-zinc-600">
                Completa tus datos para registrarte
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Botón de Google */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-zinc-100 hover:text-zinc-800 h-10 px-4 py-2 w-full"
                >
                  <svg
                    className="h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                  </svg>
                  Registrarse con Google
                </button>

                {/* Separador */}
                <div className="flex items-center gap-4">
                  <span className="h-px w-full bg-gray-100"></span>
                  <span className="text-xs text-zinc-600">O</span>
                  <span className="h-px w-full bg-gray-100"></span>
                </div>

                {/* Campos del formulario */}
                <input
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  required
                  value={formRegistrar.nombres}
                  onChange={cambiarDatos}
                  className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  required
                  value={formRegistrar.apellidos}
                  onChange={cambiarDatos}
                  className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  required
                  value={formRegistrar.correo}
                  onChange={cambiarDatos}
                  className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  type="password"
                  name="contrasena"
                  placeholder="Contraseña"
                  required
                  value={formRegistrar.contrasena}
                  onChange={cambiarDatos}
                  className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />

                {/* Botón de registrar */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
                >
                  Registrarse
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mx-auto flex gap-1 text-sm">
            <p>¿Ya tienes una cuenta?</p>
            <a href="/ingresar" className="underline">
              Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registrar;

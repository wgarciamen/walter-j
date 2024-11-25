import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import {
  ingresarClienteAuthAdministrador,
  traerUnAdministrador,
} from "../../../controllers/Sesion";

const initFormIngresar = {
  correo: "",
  contrasena: "",
};

const IngresarAdministrador = () => {
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
        const usuarioDB = await traerUnAdministrador(usuarioVerificado);
        iniciarSesion(usuarioDB);
        navigate("/administrador/reportes");
      })();
    }
  }, [usuarioVerificado, iniciarSesion, navigate]);

  const ingresar = (e) => {
    e.preventDefault();
    ingresarClienteAuthAdministrador(formIngresar).then((res) => {
      if (res.idUsuario) {
        setUsuarioVerificado(res);
      } else if (res === "contrasenaIncorrecta") {
        console.log("Contraseña Incorrecta");
      } else {
        console.log("Error en la autenticación");
      }
    });
  };

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/images/sesion/imagenIngresoLogan.jpg"
            alt="Logo de Administración"
            className="h-10"
          />
          <div className="rounded-lg border bg-white shadow-sm mx-auto w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6 items-center">
              <h3 className="font-semibold tracking-tight text-xl">
                Inicio de Sesión - Administrador
              </h3>
              <p className="text-sm text-zinc-600">
                Ingresa tus credenciales para acceder
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={ingresar} className="grid gap-4">
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
                    placeholder="admin@example.com"
                  />
                </div>
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
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 h-10 px-4 py-2 w-full"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
          <div className="flex gap-1 text-sm mt-4">
            <p>¿Olvidaste tu contraseña?</p>
            <Link to="/admin/recuperar-contrasena" className="underline">
              Recuperar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngresarAdministrador;

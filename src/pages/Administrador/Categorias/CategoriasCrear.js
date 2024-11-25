import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  categoriaCrearCF,
  categoriaCrearSF,
} from "../../../controllers/Categorias";
import GenerarUrl from "../../../util/GenerarUrl";
import "./Categorias.css";

/* ESTADO INICIAL FORMULARIO CATEGORIA */
const initFormCategoria = {
  nombre: "",
  descripcion: "",
  urlCategoria: "",
};

const CategoriasCrear = () => {
  const navigate = useNavigate();
  const [formCategoria, setFormCategoria] = useState(initFormCategoria);
  const [foto, setFoto] = useState();
  const [fotoVista, setFotoVista] = useState();
  const imagenRef = useRef();

  useEffect(() => {
    if (foto !== undefined) {
      const fotoCargada = new FileReader();
      fotoCargada.onload = () => {
        setFotoVista(fotoCargada.result);
      };
      fotoCargada.readAsDataURL(foto);
    }
  }, [foto]);

  function cambiarImagen(e) {
    let fotoSeleccionado;
    if (e.target.files && e.target.files.length === 1) {
      fotoSeleccionado = e.target.files[0];
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!validFormats.includes(fotoSeleccionado.type)) {
        alert("Solo se permiten imágenes en formato JPG, JPEG o PNG.");
        return;
      }
      setFoto(fotoSeleccionado);
    }
  }

  function cambiarImagenSubir() {
    imagenRef.current.click();
  }

  function eliminarImagen() {
    setFoto(undefined);
    setFotoVista(undefined);
    imagenRef.current.value = "";
  }

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormCategoria({
      ...formCategoria,
      [name]: value,
    });
  };

  function onBlur() {
    setFormCategoria({
      ...formCategoria,
      urlCategoria: GenerarUrl(formCategoria.nombre),
    });
  }

  const crearCategoria = (e) => {
    e.preventDefault();
    if (!formCategoria.nombre || !formCategoria.descripcion) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (foto === undefined) {
      categoriaCrearSF(formCategoria, fotoVista);
    } else {
      categoriaCrearCF(formCategoria, foto);
    }
    setFormCategoria(initFormCategoria);
    setFoto(undefined);
    setFotoVista(undefined);
    imagenRef.current.value = "";
    navigate(`/administrador/categorias`);
  };

  return (
    <>
      <div className="contenedor-crear-categorias">
        <h2>Crear Nueva Categoria</h2>
        <form onSubmit={crearCategoria}>
          <h4>Nombre:</h4>
          <input
            type="text"
            required
            name="nombre"
            placeholder="Escribe el nombre de la categoria"
            value={formCategoria.nombre}
            onChange={cambiarDatos}
            onBlur={onBlur}
          />

          <h4>URL:</h4>
          <input
            type="text"
            disabled
            required
            value={formCategoria.urlCategoria}
            placeholder="URL de la categoria generada automáticamente"
          />

          <h4>Descripción:</h4>
          <textarea
            name="descripcion"
            required
            cols="30"
            rows="8"
            placeholder="Describe la categoria"
            value={formCategoria.descripcion}
            onChange={cambiarDatos}
          ></textarea>

          <h4>Imagen:</h4>
          <input
            ref={imagenRef}
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={cambiarImagen}
          />
          <br />
          <div className="contenedor-imagenes-categorias">
            <div className="contenedor-card-categorias">
              {fotoVista && (
                <div>
                  <img src={fotoVista} alt="vista previa" />

                  <button
                    type="button"
                    style={{ backgroundColor: "red" }}
                    onClick={cambiarImagenSubir}
                  >
                    Cambiar
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: "black" }}
                    onClick={eliminarImagen}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
          <input
            className="boton-formulario"
            type="submit"
            value="Crear Categoria"
          />
        </form>
      </div>
    </>
  );
};

export default CategoriasCrear;

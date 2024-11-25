import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TablaCategoria } from "../../../components/Tablas";
import { db } from "../../../db/firebase";
import "./Categorias.css";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Categorias"), (snapshot) => {
      setCategorias(
        snapshot.docs.map((doc) => ({
          IdCategoria: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const eliminarCategoria = async (idCategoria) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      await deleteDoc(doc(db, "Categorias", idCategoria));
    }
  };

  return (
    <div className="categorias-container">
      <h2 className="titulo-categorias">Gestión de Categorías</h2>

      <Link to="/administrador/categoria-crear" className="link-agregar-categoria">
        <button className="boton-agregar">Agregar Nueva Categoría</button>
      </Link>

      {categorias?.length === 0 ? (
        <p className="mensaje-vacio">No hay categorías registradas.</p>
      ) : (
        <div className="tabla-categorias">
          <TablaCategoria categorias={categorias} eliminar={eliminarCategoria} />
        </div>
      )}
    </div>
  );
};

export default Categorias;

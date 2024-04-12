import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getAllProductos,
  postProducto,
} from "../../redux/actions/registro/registerProductos.js";
import ButtonAtras from "../resource/ButtonAtras.jsx";

const valida = (nombre, productos) => {
  let error = "";
  if (nombre.length < 3 || nombre.length === 0) {
    error = "El Nombre es requisito obligatorio";
  }
  if (
    productos &&
    productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase())
  ) {
    error = "El nombre de la página ya existe";
  }

  return error;
};

const warninging = (producto) => {
  let warning = {};
  if (producto.descripcion.length < 3 || producto.descripcion.length === 0) {
    warning.descripcion =
      "No es obligatorio pero le puede servir para encontrar un producto mas rapido";
  }
  if (producto.imagen.length < 3 || producto.imagen.length === 0) {
    warning.imagen =
      "No es obligatorio pero le puede servir para encontrar un producto mas rapido";
  }
  return warning;
};
const RegistrarProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productos = useSelector((state) => state.productos);
  const errorServer = useSelector((state) => state.error);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(getAllProductos(token));
  }, [dispatch]);

  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [confirmacion, setConfirmacion] = useState("");

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });
  const [nombre, setNombre] = useState("");

  const handleNombre = (event) => {
    const nombre = event.target.value; // Obtener el valor del campo
    setNombre(nombre); // Actualizar el estado de nombre de manera síncrona
    setProducto({
      ...producto,
      nombre: nombre, // Usar el valor actual de nombre
    });
    setError(valida(nombre, productos));
  };

  const handleDescripcion = (event) => {
    setProducto({
      ...producto,
      descripcion: event.target.value,
    });
    setWarning(
      warninging({
        ...producto,
        descripcion: event.target.value,
      })
    );
  };

  const handleImagen = (event) => {
    setProducto({
      ...producto,
      imagen: event.target.value,
    });
    setWarning(
      warninging({
        ...producto,
        imagen: event.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = valida(nombre, productos);
    if (errores.length === 0) {
      dispatch(postProducto(producto, token));
      setProducto({
        nombre: "",
        descripcion: "",
        imagen: "",
      });
      setShowForm(false);
      setConfirmacion("se envio la solicitud.");
      setConfirmacion("");
      setError(errores);
      setWarning({
        descripcion: "",
        imagen: "",
      });
      navigate("/crear");
    }
  };
  return (
    <div className="contenedor">
      <ButtonAtras />
      {confirmacion && (
        <div>
          <h1>{confirmacion}</h1>
        </div>
      )}
      {showForm && (
        <div>
          <div className="divTitulo">
            <h1 className="titulo">Registro De Productos </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <section className="sectionform">
              <section className="section">
                <div className="divlabel">
                  <label className="label">Nombre Del Producto:</label>
                </div>
                <div className="divinput">
                  <input
                    type="text"
                    value={producto.nombre}
                    onChange={handleNombre}
                    name="nombre"
                    placeholder="Escriba el nombre del producto"
                    className="input"
                  />
                </div>
              </section>
              {error && <div className="error">{error}</div>}
              <section className="section">
                <div className="divlabel">
                  <label className="label">Descripcion Del Producto:</label>
                </div>
                <div className="divinput">
                  <input
                    type="text"
                    value={producto.descripcion}
                    onChange={handleDescripcion}
                    name="descripcion"
                    placeholder="Describa el producto"
                    className="input"
                  />
                </div>
              </section>
              {warning && <div className="error">{warning.descripcion}</div>}
              <section className="section">
                <div className="divlabel">
                  <label className="label">Link De La Imagen:</label>
                </div>

                <div className="divinput">
                  <input
                    type="text"
                    value={producto.imagen}
                    onChange={handleImagen}
                    name="imagen"
                    placeholder="https://www.google.com/imagen/gatos"
                    className="input"
                  />
                </div>
              </section>
              {warning && (
                <div className="text-center text-red-500 font-bold">
                  {warning.imagen}
                </div>
              )}
            </section>
              <section className="sectionbtns">
                <button
                  type="submit"
                  className="btns"
                >
                  <BiSend className="BiSend"/>
                </button>
              </section>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrarProducto;

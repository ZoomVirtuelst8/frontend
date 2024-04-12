import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";

import { getAllProductos } from "../../redux/actions/registro/registerProductos.js";
import { postCompra } from "../../redux/actions/registro/registerCompras.js";
import { resetError } from "../../redux/actions/resetError.js";
import { useNavigate } from "react-router-dom";
import ButtonAtras from "../resource/ButtonAtras.jsx";

const validation = (compra) => {
  const { producto, cantidad, precioCompra, precioVenta, precioDiferido } =
    compra;
  let error = {};

  //* validation of product
  if (producto?.length < 3 || producto?.length === 0 || producto === "") {
    error.producto = "Selecione un producto.";
  }
  //* validation of  amount
  if (cantidad <= 0) {
    error.cantidad = "Escriba una cantidad mayor a CERO(0).";
  }
  //* validation of  price of buy
  if (precioCompra <= 0) {
    error.precioCompra = "Escriba una cantidad mayor a CERO(0).";
  }
  //* validation of  price of selling
  if (precioVenta <= 0) {
    error.precioVenta = "Escriba una cantidad mayor a CERO(0).";
  }
  //* validation of  price of selling deferred
  if (precioDiferido <= 0) {
    error.precioDiferido = "Escriba una cantidad mayor a CERO(0).";
  }
  return error;
};

const Compras = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productos = useSelector((state) => state.productos);
  const perror = useSelector((state) => state.perror);
  const gerror = useSelector((state) => state.gerror);
  const token = useSelector((state) => state.token);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [confirmacion, setConfirmacion] = useState("");
  const [compra, setCompra] = useState({
    producto: "",
    cantidad: "",
    precioCompra: "",
    precioVenta: "",
    precioDiferido: "",
  });

  useEffect(() => {
    dispatch(getAllProductos(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetError(token));
  }, [compra]);

  const handleProducto = (event) => {
    setCompra({
      ...compra,
      producto: event.target.value,
    });
    setError(
      validation({
        ...compra,
        producto: event.target.value,
      })
    );
  };
  const handleCantidad = (event) => {
    setCompra({
      ...compra,
      cantidad: event.target.value,
    });
    setError(
      validation({
        ...compra,
        cantidad: event.target.value,
      })
    );
  };
  const handlePrecioCompra = (event) => {
    setCompra({
      ...compra,
      precioCompra: event.target.value,
    });
    setError(
      validation({
        ...compra,
        precioCompra: event.target.value,
      })
    );
  };
  const handlePrecioVenta = (event) => {
    setCompra({
      ...compra,
      precioVenta: event.target.value,
    });
    setError(
      validation({
        ...compra,
        precioVenta: event.target.value,
      })
    );
  };
  const handlePrecioDiferido = (event) => {
    setCompra({
      ...compra,
      precioDiferido: event.target.value,
    });
    setError(
      validation({
        ...compra,
        precioDiferido: event.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validation(compra);
    if (Object.keys(errores).length === 0) {
      await dispatch(postCompra(compra, token));
        setConfirmacion("se envio la solicitud.");
        setTimeout(() => {
          setConfirmacion("");
          navigate("/crear");
        }, 2000);
        setCompra({
          producto: "",
          cantidad: "",
          precioCompra: "",
          precioVenta: "",
          precioDiferido: "",
          cantidadDeCuotas: "",
        });
        setShowForm(false);
      
    }
    setError(errores);
  };
  return (
    <div className="contenedor">
      <ButtonAtras />
      {confirmacion && (
        <div>
          <div className="confirmation">
            <h1>{confirmacion}</h1>
          </div>
        </div>
      )}
      {showForm && (
        <div>
          <div className="divTitulo">
            <h1 className="titulo">Registro De Compras</h1>
          </div>
          {/* {perror && (
            <div className="error">
              <h1>{`${perror?.response?.data} ${perror?.message}`}</h1>
            </div>
          )} */}
          <div>
            <form onSubmit={handleSubmit}>
              <section className="sectionform">
                {/*//? profucto */}
                <section className="divinput">
                  <select className="select" onChange={handleProducto}>
                    <option value="">Seleccione El Producto</option>
                    {productos &&
                      productos?.map((producto) => {
                        return (
                          <option key={producto.id} name="producto">
                            {producto.nombre}
                          </option>
                        );
                      })}
                  </select>
                </section>
                {error && <div className="error">{error?.producto}</div>}

                {/* //? cantidad */}
                <section className="section">
                  <div className="divlabel">
                    <label className="label">Cantidad:</label>
                  </div>

                  <div className="divinput">
                    <input
                      type="number"
                      name="cantidad"
                      value={compra.cantidad}
                      onChange={handleCantidad}
                      className="no-spin input"
                      min="1"
                    />
                  </div>
                </section>
                {error && <div className="error">{error.cantidad}</div>}

                {/* //? precio comprea */}
                <section className="section">
                  <div className="divlabel">
                    <label className="label">Precio De Compra: </label>
                  </div>
                  <div className="divinput">
                    <input
                      name="precioCompra"
                      type="number"
                      value={compra.precioCompra}
                      onChange={handlePrecioCompra}
                      min="1"
                      className="no-spin input"
                    />
                  </div>
                </section>
                {error && <div className="error">{error.precioCompra}</div>}

                {/* //? precio venta */}
                <section className="section">
                  <div className="divlabel">
                    <label className="label">Precio De Venta: </label>
                  </div>
                  <div className="divinput">
                    <input
                      name="precioVenta"
                      type="number"
                      value={compra.precioVenta}
                      onChange={handlePrecioVenta}
                      min="1"
                      className="no-spin input"
                    />
                  </div>
                </section>
                {error && <div className="error">{error.precioVenta}</div>}

                {/* //? precio diferido */}
                <section className="section">
                  <div className="divlabel">
                    <label className="label">Precio De Venta Diferido: </label>
                  </div>
                  <div className="divinput">
                    <input
                      name="precioDiferido"
                      type="number"
                      value={compra.precioDiferido}
                      onChange={handlePrecioDiferido}
                      min="1"
                      className="no-spin input"
                    />
                  </div>
                </section>
                {error && <div className="error">{error.precioDiferido}</div>}
              </section>
              {/*//! boton send */}
              <section className="sectionbtns">
                <button className="btns" type="submit">
                  <BiSend className="BiSend" />
                </button>
              </section>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compras;

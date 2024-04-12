import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";

import {
  postPorcentaje,
  getAllPorcentaje,
} from "../../redux/actions/registro/registerPorcentaje.js";
import { useNavigate } from "react-router-dom";
import ButtonAtras from "../resource/ButtonAtras.jsx";

const validationsError = (porcentajes) => {
  let error = {};

  if (!porcentajes.nombre || porcentajes.nombre.length < 3) {
    error.nombre = "Error usted debe elegir un porcentaje para el usuario";
  }

  if (!porcentajes.inicial || porcentajes.inicial.length < -1) {
    error.inicial = "Error debe poner una cifra para el porcentaje inicial.";
  }
  if (!porcentajes.final || porcentajes.final.length < -1) {
    error.final = "Error debe poner una cifra para el porcentaje final.";
  }

  if (!porcentajes.meta || porcentajes.meta.length < -1) {
    error.meta =
      "Error debe poner una cifra para establecer los creditos necesario para ganar el porcentaje final.";
  }

  return error;
};

const RegisterPorcentaje = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalLocation = useSelector((state) => state.porcentajes);
  const token = useSelector((state) => state.token);

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllPorcentaje(token));
  }, [dispatch]);

  const [porcentajes, setPorcentajes] = useState({
    nombre: "",
    inicial: "",
    final: "",
    meta: "",
  });
  const handleNombre = (event) => {
    setPorcentajes({
      ...porcentajes,
      nombre: event.target.value,
    });

    setError(
      validationsError({
        ...porcentajes,
        nombre: event.target.value,
      })
    );
  };

  const handleInicial = (event) => {
    setPorcentajes({
      ...porcentajes,
      inicial: event.target.value,
    });

    setError(
      validationsError({
        ...porcentajes,
        inicial: event.target.value,
      })
    );
  };
  const handleFinal = (event) => {
    setPorcentajes({
      ...porcentajes,
      final: event.target.value,
    });

    setError(
      validationsError({
        ...porcentajes,
        final: event.target.value,
      })
    );
  };
  const handleMeta = (event) => {
    setPorcentajes({
      ...porcentajes,
      meta: event.target.value,
    });

    setError(
      validationsError({
        ...porcentajes,
        meta: event.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacionFinal = validationsError(porcentajes);
    if (Object.keys(validacionFinal).length === 0) {
      dispatch(postPorcentaje(porcentajes, token));
      setPorcentajes({
        nombre: "",
        inicial: "",
        final: "",
        meta: "",
      });
      navigate("/crear");
    }
    setError(validacionFinal);
  };

  return (
    <div className="contenedor">
      <ButtonAtras />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="divTitulo">
            <h1 className="titulo">Registro De Porcentaje</h1>
          </div>
          <section className="sectionform">
            <section className="section">
              <div className="divlabel">
                {" "}
                <label className="label">Nombre:</label>
              </div>
              <div className="divinput">
                <input
                  type="text"
                  value={porcentajes.nombre}
                  onChange={handleNombre}
                  className="input"
                />
              </div>
            </section>
            {error.nombre && <div className="error">{error.nombre}</div>}
            <section className="setion">
              <div className="divlabel">
                <label className="label">Inical:</label>
              </div>
              <div className="divinput">
                <input
                  type="number"
                  value={porcentajes.inicial}
                  onChange={handleInicial}
                  min="1" // Valor mínimo permitido (positivo)
                  // step="1" // Incremento/decremento permitido (solo números enteros)
                  className="no-spin input"
                />
              </div>
            </section>
            {error.inicial && <div className="error">{error.inicial}</div>}

            <section className="setion">
              <div className="divlabel">
                <label className="label">Final:</label>
              </div>
              <div className="divinput">
                <input
                  type="number"
                  value={porcentajes.final}
                  onChange={handleFinal}
                  min="1"
                  className="no-spin input"
                />
              </div>
            </section>
            {error.final && <div className="error">{error.final}</div>}

            <section className="setionLocation">
              <div className="divlabel">
                <label className="label">Meta:</label>
              </div>
              <div className="divinput">
                <input
                  type="number"
                  value={porcentajes.meta}
                  onChange={handleMeta}
                  min="1"
                  className="no-spin input"
                />
              </div>
            </section>
            {error.meta && <div className="error">{error.meta}</div>}
          </section>
          <section className="sectionbtns">
            <button className="btns" type="submit">
              <BiSend className="BiSend" />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegisterPorcentaje;

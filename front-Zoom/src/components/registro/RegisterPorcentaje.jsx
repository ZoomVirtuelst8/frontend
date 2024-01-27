import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";

import {
  postPorcentaje,
  getAllPorcentaje,
} from "../../redux/actions/registro/registerPorcentaje.js";
import { useNavigate } from "react-router-dom";

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

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllPorcentaje());
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
      dispatch(postPorcentaje(porcentajes));
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
    <div className="contenedor1">
      <div className="contenedor2">
        <form onSubmit={handleSubmit}>
          <section className="form">
            <h1 className="font-bold text-black text-2xl">
              Registro De Porcentaje
            </h1>

            <section className="setionLocation">
              <h1 className="sectionH1">Nombre:</h1>
              <input
                type="text"
                value={porcentajes.nombre}
                onChange={handleNombre}
              />
            </section>
            {error.nombre && (
              <div className="text-center text-red-500 font-bold">
                {error.nombre}
              </div>
            )}
            <section className="setionLocation">
              <h1 className="sectionH1">Inical:</h1>
              <input
                type="number"
                value={porcentajes.inicial}
                onChange={handleInicial}
                min="1" // Valor mínimo permitido (positivo)
                // step="1" // Incremento/decremento permitido (solo números enteros)
                className="no-spin"
              />
            </section>
            {error.inicial && (
              <div className="text-center text-red-500 font-bold">
                {error.inicial}
              </div>
            )}

            <section className="setionLocation">
              <h1 className="sectionH1">Final:</h1>
              <input
                type="number"
                value={porcentajes.final}
                onChange={handleFinal}
                min="1"
                className="no-spin"
              />
            </section>
            {error.final && (
              <div className="text-center text-red-500 font-bold">
                {error.final}
              </div>
            )}

            <section className="setionLocation">
              <h1 className="sectionH1">Meta:</h1>
              <input
                type="number"
                value={porcentajes.meta}
                onChange={handleMeta}
                min='1'
                className="no-spin"
              />
            </section>
            {error.meta && (
              <div className="text-center text-red-500 font-bold">
                {error.meta}
              </div>
            )}
          </section>
          <section className="flex items-center justify-center">
            <button className="btn-w w-auto font-bold text-4xl" type="submit">
              <BiSend />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegisterPorcentaje;

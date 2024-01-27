import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSend } from "react-icons/bi";

import {
  postUbicacion,
  getAllUbicacion,
} from "../../redux/actions/registro/RegisterUbicacion.js";

const validationsError = (ubicacion) => {
  let error = {};

  if (!ubicacion || ubicacion.length < 3 || ubicacion.length === 0) {
    error.ubicacion = "Error debe dar una ubicacion valida";
  }

  return error;
};
const RegisterUbicacion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getAllUbicacion());
  }, [dispatch]);

  const handleUbicacion = (event) => {
    setUbicacion(event.target.value);
    setError(validationsError(event.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacionFinal = validationsError(ubicacion);
    if (Object.keys(validacionFinal).length === 0) {
      dispatch(postUbicacion(ubicacion));
      setUbicacion("");
      navigate("/crear");
    }
    setError(validacionFinal);
  };


  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <form onSubmit={handleSubmit}>
          <section className="form">
            <h1 className="font-bold text-black text-3xl my-2">
              Registro De Ubicacion
            </h1>

            <section className="sectionMoneda items-center">
              <h1 className="sectionH1">Ubicacion:</h1>
              <input
                type="text"
                value={ubicacion}
                onChange={handleUbicacion}
                className="input"
              />
            </section>
            {error.ubicacion && (
              <div className="text-center text-red-500 font-bold">
                {error.ubicacion}
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

export default RegisterUbicacion;

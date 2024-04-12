import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSend } from "react-icons/bi";

import {
  postUbicacion,
  getAllUbicacion,
} from "../../redux/actions/registro/RegisterUbicacion.js";
import ButtonAtras from "../resource/ButtonAtras.jsx";

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
  const token = useSelector((state) => state.token);
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getAllUbicacion(token));
  }, [dispatch]);

  const handleUbicacion = (event) => {
    setUbicacion(event.target.value);
    setError(validationsError(event.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacionFinal = validationsError(ubicacion);
    if (Object.keys(validacionFinal).length === 0) {
      dispatch(postUbicacion(ubicacion, token));
      setUbicacion("");
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
            <h1 className="titulo">Registro De Ubicacion</h1>
          </div>
          <section className="sectionform">
            <section className="section">
              <div className="divlabel">
                <label className="label">Ubicacion:</label>
              </div>
              <div className="divinput">
                <input
                  type="text"
                  value={ubicacion}
                  onChange={handleUbicacion}
                  className="input"
                />
              </div>
            </section>
            {error.ubicacion && <div className="error">{error.ubicacion}</div>}
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

export default RegisterUbicacion;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { initSession } from "../../redux/actions/initSession.js";
import { resetError } from "../../redux/actions/resetError.js";
const SignIn = () => {
  const initSesion = useSelector((state) => state.initSession);
  const perror = useSelector((state) => state.Error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sesion, setsesion] = useState({
    session: "",
    password: "",
  });
useEffect(() => {
  dispatch(resetError())
}, [sesion])
  const handleUserName = (e) => {
    setsesion({
      ...sesion,
      session: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setsesion({
      ...sesion,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(initSession(sesion));
    } catch (error) {
    }
  };
  useEffect(() => {
    (async () => {
      try {
      } catch (error) {
      }
    })
  }, [])
  useEffect(() => {
     if (initSesion) {
      navigate("/loader");
    }
  }, [initSesion])
  return (
    <div className="contenedor">
      <form onSubmit={handleSubmit}>
        <h1 className="titlesignin">
          Inicio de sesion
        </h1>
        <section className="sectionform">
          <div>
            <div className="divlabel">
          <label className="label">User Name:</label>
            </div>
            <input
              className="input"
              type="text"
              placeholder="userName"
              value={sesion.session}
              name="session"
              onChange={handleUserName}
            />
          </div>
          <div>
            <div className="divlabel">
          <label className="label">Contraseña:</label>
            </div>
            <input
              type="password"
              className="input"
              placeholder="password"
              value={sesion.password}
              name="password"
              onChange={handlePassword}
            />
          </div>
          <button className="btns" type="submit">
            Enviar
          </button>
        </section>
      <div className="error">{perror}</div>
      </form>
    </div>
  );
};

export default SignIn;

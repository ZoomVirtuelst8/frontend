
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cerrarSession } from "../../redux/actions/cerrarSession.js";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cerrarSession());
  }, [dispatch]);

  return (
    <div className="contenedor">
      <h1 className="titlelogin">zoom virtuel</h1>
      <p className="font-bold text-center">
        Bienvenido a Zoom Virtuel Studio Web Cam Quieres ser parte de nuestro
        gran equipo de trabajo se puede contactar con nosotros enviando un
        correo electronico o al whatsapp estaremos encantado de atenderle
      </p>
      <div className="conbtnslogin">
        <Link to="/signIn">
          <button className="btnslogin">Iniciar Sesion</button>
        </Link>
        <Link to="/registro">
          <button className="btnslogin">Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

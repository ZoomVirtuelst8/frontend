import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const INIT = import.meta.env.VITE_REACT_APP_URL_INIT;

const Protected = () => {
  return (
    <div className="contenedor1">
      <div className="contenedor2 flex justify-center items-center h-screen flex-col">
        <h1 className="font-bold text-6xl animate-bounce pt-8">Lo siento debe iniciar sesion primero</h1>
        <Link to={INIT}>
          <button className="btn-w justify-between items-center border-2 border-black border-b-8 border-l-8 hover:scale-125">
            <FcGoogle className=" text-9xl p-1 justify-between items-center" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Protected;

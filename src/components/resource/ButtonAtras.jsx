import React from "react";
import { Link } from "react-router-dom";
const ButtonAtras = () => {
  return (
    <div className="fixed top-14 left-5 ">
      <Link to="/crear">
        <button className="btns text-xl">Ir A Registros</button>
      </Link>
    </div>
  );
};

export default ButtonAtras;

import React from "react";
import { Link } from "react-router-dom";
const ButtonHome = () => {
  return (
    <div className="fixed top-14 left-5">
      <Link to="/home">
        <button className="btns text-xl">Ir A Home</button>
      </Link>
    </div>
  );
};

export default ButtonHome;

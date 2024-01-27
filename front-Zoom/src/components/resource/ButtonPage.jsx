import React from "react";
import { Link } from "react-router-dom";
const ButtonPage = () => {
  return (
    <div className="bg-indigo-400 rounded-xl border-4 m-1 border-indigo-300 max-w-fit absolute">
      <Link to="/crear/estadisticas">
        <button className="btn-n">PAGINAS</button>
      </Link>
    </div>
  );
};

export default ButtonPage;

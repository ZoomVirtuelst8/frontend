import React from "react";
import { Link } from "react-router-dom";
const ButtonHome = () => {
  return (
    <div className="bg-indigo-400 dark:bg-slate-700 rounded-xl border-4 m-2 border-indigo-300 dark:border-black w-20 absolute">
      <Link to="/home">
        <button className="btns">Home</button>
      </Link>
    </div>
  );
};

export default ButtonHome;

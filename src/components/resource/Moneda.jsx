import React from "react";
import Fecha from "./Fecha.jsx";
import { Link } from "react-router-dom";

import { TiCogOutline } from "react-icons/ti";

const Moneda = ({ quincena }) => {
  return (
    <div className="flex-col text-center font-bold bg-indigo-300 rounded-2xl mx-20 my-5">
      <section className="flex justify-end m-1 p-1">
        <Link to="/editar">
          <div className="flex items-center justify-center">
            <TiCogOutline className=" text-5xl btn-n" />
          </div>
        </Link>
      </section>
      <div className="-mt-16 m-2 p-2">
        <Fecha />
        <p>Quincena Actual: {quincena && quincena?.nombre}</p>
      </div>

      <div className="flex grid-cols-2 mx-8 justify-center">
        <div className=" text-center">
          <p className="text-4xl ">
            {quincena && quincena?.monedas?.descripcion.toUpperCase()}
          </p>
          <section className="grid grid-cols-3 px-2 border-2 border-indigo-900 text-4xl text-black m-2 rounded-xl">
            <section className="mx-2 px-2 grid grid-cols-1  border-r-2 border-indigo-900 text-center">
              <h1>DOLAR: </h1>
              <h1>
                ${" "}
                {Intl.NumberFormat("es-CP").format(
                  quincena?.monedas && quincena?.monedas?.dolar
                )}
              </h1>
            </section>
            <section className="mx-2 px-2 grid grid-cols-1  border-r-2 border-indigo-900 text-center">
              <h1>EUROS: </h1>
              <h1>
                ${" "}
                {Intl.NumberFormat("es-CP").format(
                  quincena?.monedas && quincena?.monedas?.euro
                )}
              </h1>
            </section>
            <section className="mx-2 px-2 grid grid-cols-1 text-center">
              <h1>LIBRA: </h1>
              <h1>
                ${" "}
                {Intl.NumberFormat("es-CP").format(
                  quincena?.monedas && quincena?.monedas?.libra
                )}
              </h1>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Moneda;

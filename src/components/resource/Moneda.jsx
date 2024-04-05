import React from "react";
import Fecha from "./Fecha.jsx";

const Moneda = ({ quincena }) => {
  return (
    <div className=" flex-col text-center font-bold bg-indigo-300 dark:bg-slate-700 dark:text-slate-300 rounded-2xl mx-5 my-5">
      <div className="m-2 p-2">
        <Fecha />
        <p>Quincena Actual: {quincena && quincena?.nombre}</p>
      </div>

      <div className="flex grid-cols-2 mx-8 justify-center">
        <div className=" text-center">
          <p className="text-4xl ">
            {quincena && quincena?.monedas?.descripcion.toUpperCase()}
          </p>
          <section className="grid grid-cols-3 m-2 border-2 border-indigo-900 dark:border-slate-900 text-4xl sm:text-sm  md:text-2xl text-black dark:text-slate-300 rounded-xl">
            <section className="grid grid-cols-1 border-r-2 border-indigo-900 dark:border-slate-900 text-center w-fit dark:text-slate-300">
              <h1 className="uppercase">dolar: </h1>
              <h1 className="sm:text-xs md:text-xl sm:text-center sm:w-fit m-1">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(quincena?.monedas && quincena?.monedas?.dolar)}
              </h1>
            </section>
            <section className="grid grid-cols-1 border-r-2 border-indigo-900 dark:border-slate-900 text-center w-fit">
              <h1 className="uppercase">euros: </h1>
              <h1 className="sm:text-xs md:text-xl sm:text-center sm:w-fit m-1">
                {Intl.NumberFormat("es-EU", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(quincena?.monedas && quincena?.monedas?.euro)}
              </h1>
            </section>
            <section className="grid grid-cols-1 text-center w-fit">
              <h1 className=" uppercase">gbp: </h1>
              <h1 className="sm:text-xs md:text-xl sm:text-center sm:w-fit m-1">
                {Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(quincena?.monedas && quincena?.monedas?.libra)}
              </h1>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Moneda;

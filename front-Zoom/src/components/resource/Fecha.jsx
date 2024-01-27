import React from "react";

const Fecha = () => {
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const fechaFormateada = fecha.toLocaleDateString(undefined, opcionesFecha);

    return `${fechaFormateada}`;
  };

  return (
    <div>
      <section>
        <span>Fecha: 📆 {obtenerFechaActual()}</span>
      </section>
    </div>
  );
};

export default Fecha;

import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";

import { getAllQuincena } from "../../redux/actions/registro/registerQuincena.js";
import { useDispatch, useSelector } from "react-redux";
import { postMoneda } from "../../redux/actions/registro/registerMoneda.js";
import { useNavigate } from "react-router-dom";
import ButtonAtras from "../resource/ButtonAtras.jsx";

const Moneda = () => {
  const [moneda, setMoneda] = useState({
    quincena: "",
    descripcion: "",
    dolar: "",
    euro: "",
    libra: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quincenas = useSelector((state) => state.quincenas);
  const error = useSelector((state) => state.error);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(getAllQuincena(token));
  }, [dispatch]);

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual
    const quincenaActual = quincenas.find((q) => {
      const quincenaInicio = q.inicia;
      const partesFechaInicio = quincenaInicio.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1;
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

      const quincenaFinal = q.final;
      const partesFechaFinal = quincenaFinal.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1;
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      // Crea un objeto de fecha
      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual) {
      setMoneda({
        ...moneda,
        quincena: quincenaActual.id,
      });
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setMoneda({
      ...moneda,
      quincena: event.target.value,
    });
  };

  const handleDescripcion = (event) => {
    setMoneda({
      ...moneda,
      descripcion: event.target.value,
    });
  };

  const handlePagoDolar = (event) => {
    setMoneda({
      ...moneda,
      dolar: event.target.value,
    });
  };
  const handlePagoEuro = (event) => {
    setMoneda({
      ...moneda,
      euro: event.target.value,
    });
  };
  const handlePagoLibra = (event) => {
    setMoneda({
      ...moneda,
      libra: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postMoneda(moneda, token));
    setTimeout(() => {
      navigate("/crear");
    }, 1000)
  };

  return (
    <div className="contenedor">
      <ButtonAtras />
      <div>
        <div className="divTitulo">
          <h1 className="titulo">Registro De Moneda</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <section className="sectionform ">
            <section className="divinput">
              <select
                onChange={handleQuincena}
                value={moneda.quincena}
                className="select"
              >
                <option value="" hidden>
                  Seleccione Una Quincena
                </option>
                {quincenas?.map((x) => {
                  return (
                    <option value={x.id} key={x.id}>
                      {x.nombre}
                    </option>
                  );
                })}
              </select>
            </section>

            <section className="divinput">
              <select
                onChange={handleDescripcion}
                value={moneda.descripcion}
                className="select"
              >
                <option value="" hidden>
                  Moneda Para?
                </option>
                <option value="estadisticas">Estadisticas</option>
                <option value="pago">Pago</option>
              </select>
            </section>

            <section className="section">
              <h2 className="text-center">Modenda Para: </h2>{" "}
              <h2 className="text-center font-bold uppercase">
                {moneda.descripcion}
              </h2>
              <section className="section">
                <div className="divlabel">
                  <label className="label">Dolar:</label>
                </div>
                <div className="divinput">
                  <input
                    type="number"
                    className="input no-spin"
                    value={moneda.dolar}
                    placeholder="valor del dolar"
                    onChange={handlePagoDolar}
                  />
                </div>
              </section>
              <section className="section">
                <div className="divlabel">
                  <label className="label">Euro:</label>
                </div>
                <div className="divinput">
                  <input
                    type="number"
                    className="input no-spin"
                    placeholder="valor del euro"
                    value={moneda.euro}
                    onChange={handlePagoEuro}
                  />
                </div>
              </section>
              <section className="section">
                <div className="divlabel">
                  <label className="label">Libra Esterlina:</label>
                </div>
                <div className="div">
                  {" "}
                  <input
                    type="number"
                    className="input no-spin"
                    placeholder="valor del libra"
                    value={moneda.libra}
                    onChange={handlePagoLibra}
                  />
                </div>
              </section>
            </section>
          </section>
            <section className="sectionbtns">
              <button className="btns" type="submit">
                <BiSend className="BiSend"/>
              </button>
            </section>
        </form>
      </div>
    </div>
  );
};

export default Moneda;

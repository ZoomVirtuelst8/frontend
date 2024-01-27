import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetError } from "../../redux/actions/paginas/adult.js";
import { pdi } from "../../redux/actions/paginas/dirty.js";
import TextareaForm from "../resource/Textarea";
import ButtonPage from "../resource/ButtonPage.jsx";

import {
  getAllQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

const Dirty = () => {
  const [input, setInput] = useState([]);
  const [codi, setCodi] = useState(input);
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const quincenas = useSelector((state) => state.quincenas);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    setInput([])
  }, [id])

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
      setId(quincenaActual.id);
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };

  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    setCodi(() => {
      const regex = /(\w+)\s+(\d+(?:\.\d+)?)\s+(euro|dolar)/g;

      const matches = [...event.target.value.matchAll(regex)];
      const result = matches
        .map((match) => ({
          quincena: id,
          user: match[1],
          plata:
            parseFloat(match[2].replace(",", ".")) >= 50
              ? parseFloat(match[2].replace(",", "."))
              : 0,
          moneda: match[3],
        }))
        .filter((item) => item.plata !== 0.0)
        .sort((a, b) => a.user.localeCompare(b.user));
      return result;
    });
  };

  const handlerSubmit = () => {
    dispatch(pdi(codi));
    setInput([]);
    setCodi([]);
  };
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <ButtonPage />
        <div>
          <select className="select" onChange={handleQuincena} value={id}>
            <option value="" hidden>
              Seleccione Una Quincena
            </option>
            {quincenas &&
              quincenas?.map((x) => {
                return (
                  <option value={x.id} key={x.id}>
                    {x.nombre}
                  </option>
                );
              })}
          </select>
        </div>
        <TextareaForm
          value={input}
          onChange={handleTextarea}
          onSubmit={handlerSubmit}
          placeholder="Pegue aquí el corte de Dirty"
          titulo="Corte De Dirty"
        />
        <div className="mt-24">
          {errors && <p className="error">{errors.message}</p>}
        </div>
      </div>

      <div className="contenedor3">
        <div className="contenedor4">
          <h2 className="titulo">Creditos a Subir</h2>
          {codi?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user} </p>
                  <p>Dinero: {x.plata} </p>
                  <p>Moneda: {x.moneda} </p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>

        <div className="contenedor4">
          <h2 className="titulo">Creditos subidos</h2>
          {!errors && (
            <div>
              {reporte?.map((x, i) => {
                return (
                  <div key={x.id}>
                    <h3 className="mostrarcorte">
                      <p>{i + 1}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Dinero: {x.plata}</p>
                      <p>Modenda: {x.moneda}</p>
                      <p>fecha creacion: {x.createdAt}</p>
                    </h3>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dirty;

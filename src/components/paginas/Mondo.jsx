import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMondo } from "../../redux/actions/paginas/mondo.js";
import TextareaForm from "../resource/Textarea.jsx";
import ButtonPage from "../resource/ButtonPage.jsx";

import {
  getAllQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

const Mondo = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const quincenas = useSelector((state) => state.quincenas);
  const token = useSelector((state) => state.token);

  const [input, setInput] = useState([]);
  const [mondo, setMondo] = useState(input);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAllQuincena(token));
  }, [dispatch]);
  useEffect(() => {
    setInput([])
  }, [id]);

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual
    const quincenaActual = quincenas.find((q) => {
      const quincenaInicio = q.inicia;
      const partesFechaInicio = quincenaInicio.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1;
      const añoInicio = parseInt(partesFechaInicio[2], 10);
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);
      const quincenaFinal = q.final;
      const partesFechaFinal = quincenaFinal.split("/");

      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1;
      const añoFinal = parseInt(partesFechaFinal[2], 10);

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

  const handleTextarea = (event) => {
    setInput(event.target.value);
    setMondo(() => {
      const regex = /(\w+)(?:\s+(\d+\.\d+|\d+))?/g;
      const matches = [];
      let match;

      while ((match = regex.exec(event.target.value)) !== null) {
        const user = match[1];
        const euros = parseFloat(match[2]);
        if (user && !isNaN(euros) && euros >= 27.5) {
          matches.push({ user, euros, quincena: id });
        }
      }

      return matches;
    });
  };
  
  const handleSubmit = () => {
    dispatch(postMondo(mondo, token));
    setInput([]);
    setMondo([]);
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
          onSubmit={handleSubmit}
          placeholder="Peque aqui el corte de Mondo"
          titulo="Corte De Mondo"
        />

        <div className="mt-24">
          {errors && (
            <p className="font-bold bg-black text-red-600 max-w-md m-auto">
              {errors.message}
            </p>
          )}
        </div>

        <div className="contenedor3">
          <div className="contenedor4">
            <h2 className="titulo">Creditos a Subir</h2>
            {mondo?.map((x, i) => {
              return (
                <div key={i}>
                  <h3 className="mostrarcorte">
                    <p>{i + 1}</p>
                    <p>Nombre: {x.user} </p>
                    <p>Dinero: {x.euros} </p>
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
                        <p>Dinero: {x.euros}</p>
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
    </div>
  );
};

export default Mondo;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pad, resetError } from "../../redux/actions/paginas/adult.js";
import TextareaForm from "../resource/Textarea.jsx";
import ButtonPage from "../resource/ButtonPage.jsx";

import {
  getAllQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

function Adultregular() {
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [coad, setCoad] = useState(input);

  const dispatch = useDispatch();
  
  useEffect(() => {
    // Llama a la acción de reinicio cuando el componente se desmonte
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setCoad(() => {
        const regex =
          /Details\s+(\S+)\s+(\S+\s\S+)\s+Cosmo Payment\s+(\S+)\s+(\d+\.\d+)/g;
        const matches = event.target.value.matchAll(regex);

        const result = [];

        let key = 1;
        for (const match of matches) {
          key = key + 1;
          result.push({
            user: match[1],
            fecha: match[2],
            creditos: parseFloat(match[4], 2),
            parcial: false,
            quincena: id,
          });
          result.sort((a, b) => {
            return a.user.localeCompare(b.user);
          });
        }
        return result;
      });
  };

  const handlerSubmit = () => {
    dispatch(pad(coad));
    setInput([]);
    setCoad([]);
  };

  const quincenas = useSelector((state) => state.quincenas);
  const [id, setId] = useState("");

  useEffect(() => {
    setInput([])
  }, [id])
  useEffect(() => {
    dispatch(getAllQuincena());
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
      setId(quincenaActual.id);
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
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
          placeholder="Pegue aquí el corte de Adult Regular"
          titulo="Corte De Adult Regular"
        />
        <div className="mt-24">
          {errors && (
            <p className="error">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="contenedor3">
        <div className="contenedor4">
          <h2 className="titulo">
            Creditos a subir
          </h2>
          {coad?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>Nombre: {x.user}</p>
                  <p>Parcial: {x.parcial}</p>
                  <p>Creditos: {x.creditos}</p>
                  <p>fecha Creditos: {x.fecha}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>

        <div className="contenedor4">
          <h2 className="titulo">
            Creditos a subidos
          </h2>
          {!errors && (
            <div>
              {reporte?.map((x) => {
                return (
                  <div key={x.id}>
                    <h3 className="border-b-2 border-black">
                      <p>Nombre: {x.userName}</p>
                      <p>Parcial: {x.parcial}</p>
                      <p>Creditos: {x.creditos}</p>
                      <p>fecha Creditos: {x.fecha}</p>
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
}

export default Adultregular;

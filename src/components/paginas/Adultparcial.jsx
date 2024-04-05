import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ppad, resetError } from "../../redux/actions/paginas/adult.js";
import TextareaForm from "../resource/Textarea.jsx";
import ButtonPage from "../resource/ButtonPage.jsx";

import {
  getAllQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

function Adultparcial() {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const token = useSelector((state) => state.token);
  const [input, setInput] = useState([]);
  const [copad, setCopad] = useState(input);
  const quincenas = useSelector((state) => state.quincenas);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getAllQuincena(token));
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

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [input, dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value),
      setCopad(() => {
        const regex = /(\w+)\s+(?:Performs on a Webcam|Escorts).*?(\d+\.\d+)/g;
        const extractedData = [];

        let match;
        while ((match = regex.exec(event.target.value)) !== null) {
          const user = match[1];
          const creditos = parseFloat(match[2]);
          if (creditos !== 0) {
            extractedData.push({ user, creditos, parcial: true, quincena: id });
          }
          extractedData.sort((a, b) => {
            return a.user.localeCompare(b.user);
          });
        }
        return extractedData;
      });
  };

  const handlerSubmit = () => {
    dispatch(ppad(copad, token));
    setInput([]);
    setCopad([]);
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
          placeholder="Pegue aquí el corte de Adult Parcial"
          titulo="Corte De Adult Parcial"
        />

        <div className="mt-24">
          {errors && (
            <p className="font-bold bg-black text-red-600 max-w-md m-auto">
              {errors.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="contenedor4">
          <h2 className="titulo">
            Creditos a subir
          </h2>
          {copad?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="border-b-2 border-black">
                  <p>{i+1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Parcial: {x.parcial}</p>
                  <p>Creditos: {x.creditos}</p>
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

export default Adultparcial;

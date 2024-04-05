import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pil } from "../../redux/actions/paginas/isLive.js";
import { resetError } from "../../redux/actions/paginas/adult.js";
import TextareaForm from "../resource/Textarea.jsx";
import ButtonPage from "../resource/ButtonPage.jsx";

import {
  getAllQuincena,
} from "../../redux/actions/registro/registerQuincena.js";

const IsLive = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.cil);
  const errors = useSelector((state) => state.error);
  const token = useSelector((state) => state.token);

  const [input, setInput] = useState([]);
  const [coil, setCoil] = useState(input);
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

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    // Procesa la entrada aquí mismo y actualiza corteChat
    const lines = event.target.value.split("\n");
    const promocodePattern = /Promocode:\s+(\d+)/;

    const subtotalPattern = /Subtotaal\s+([\d,]+)/;

    const promocodes = [];
    let currentPromocode = null;
    let currentSubtotal = null;

    for (const line of lines) {
      const promocodeMatch = line.match(promocodePattern);
      const subtotalMatch = line.match(subtotalPattern);

      if (promocodeMatch) {
        currentPromocode = promocodeMatch[1];
      } else if (subtotalMatch) {
        currentSubtotal = parseFloat(subtotalMatch[1].replace(",", "."));
        if (currentPromocode !== null && currentSubtotal !== null) {
          promocodes.push({
            quincena: id,
            codigo: currentPromocode,
            euros: currentSubtotal,
          });
          currentPromocode = null;
          currentSubtotal = null;
        }
      }
    }
    promocodes.sort((a, b) => {
      return a.codigo.localeCompare(b.codigo);
    });
    setCoil(promocodes);
  };
  const handlerSubmit = () => {
    dispatch(pil(coil, token));
    setInput([]);
    setCoil([]);
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
          placeholder="Pegue aquí el Corte De Is Live"
          titulo="Corte De Is Live"
        />
        <div className="mt-24">
          {errors && <p className="error">{errors.message}</p>}
        </div>
      </div>

      <div className="contenedor3">
        <div className="contenedor4">
          <h2 className="titulo">Creditos a subir</h2>
          {coil?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Codigo: {x.codigo}</p>
                  <p>Euros: {x.euros}</p>
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
                      <p>Codigo: {x.codigo}</p>
                      <p>Euros: {x.euros}</p>
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

export default IsLive;

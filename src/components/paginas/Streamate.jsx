import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pse } from "../../redux/actions/paginas/sender.js";
import { resetError } from "../../redux/actions/paginas/adult.js";
import TextareaForm from "../resource/Textarea.jsx";
import ButtonPage from "../resource/ButtonPage.jsx";

import { getAllQuincena } from "../../redux/actions/registro/registerQuincena.js";
import { postStreamate } from "../../redux/actions/paginas/streamate.js";
const Streamate = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);
  const [input, setInput] = useState([]);
  const [streamate, setStreamate] = useState(input);
  const quincenas = useSelector((state) => state.quincenas);
  const token = useSelector((state) => state.token);

  const [id, setId] = useState("");
  const [rango, setRango] = useState({
    inicio: "",
    fin: "",
  });
  useEffect(() => {
    setInput([]);
    setStreamate([]);
  }, [id]);
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
      setId(quincenaActual.id);
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };
  useEffect(() => {
    const quincena = quincenas.find((x) => x?.id === id);
    const fechaInicio = quincena?.inicia;
    const partesFecha = fechaInicio?.split("/");
    let fechaISO = "";
    if (partesFecha) {
      fechaISO = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
    }
    const fecha = new Date(fechaISO);
    const diaInicio = fecha.getDate();
    const fechaFinal = quincena?.final;
    const partesFechas = fechaFinal?.split("/");
    let fechaISOS = "";
    if (partesFechas) {
      fechaISOS =
        partesFechas[2] + "-" + partesFechas[1] + "-" + partesFechas[0];
    }
    const fechaFin = new Date(fechaISOS);
    const diaFinal = fechaFin.getDate();

    setRango({
      inicio: diaInicio,
      fin: diaFinal,
    });
  }, [id]);
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    setStreamate(() => {
      const partes = event.target.value.split(/={2,}|\n+(?=\s*Earnings for)/);
      const partesEarnings = partes.filter((parte) =>
        parte.includes("Earnings for")
      );
      let resultados = partesEarnings.map((parte) => {
        const lineas = parte.split("\n").filter((linea) => linea.trim() !== "");
        return lineas;
      });
      let final = [];
      for (let i = 0; i < resultados.length; i++) {
        let arrayActual = resultados[i];
        if (arrayActual.length > 1 && arrayActual[0].includes("Earnings for")) {
          const usuarioLinea = arrayActual[0];
          const usuarioMatch = usuarioLinea.match(/Earnings for (\S+) earned/);
          const usuarioOriginal = usuarioMatch ? usuarioMatch[1] : null;
          const usuario = usuarioOriginal
            ? usuarioOriginal.replace(/Studio$/, "")
            : null;
          if (usuario) {
            function formatearFecha(fecha) {
              const dia = fecha.getDate().toString().padStart(2, "0");
              const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
              const anio = fecha.getFullYear().toString().slice(-2);
              return `${dia}/${mes}/${anio}`;
            }
            const datos = arrayActual
              .slice(2, -1)
              .map((linea) => {
                const [fechaStr, dolares] = linea.split("\t").slice(0, 2);
                if (fechaStr && dolares) {
                  const fechaDate = new Date(fechaStr);
                  if (!isNaN(fechaDate.getTime())) {
                    const fechaFormateada = formatearFecha(fechaDate);
                    if (
                      fechaDate.getDate() >= rango.inicio &&
                      fechaDate.getDate() <= rango.fin
                    ) {
                      return {
                        user: usuario,
                        fecha: fechaFormateada,
                        dolares: parseFloat(dolares.replace("$", "")),
                      };
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              })
              .filter(Boolean);
            final.push(datos);
          }
        }
      }

      let consolidado = {};
      for (let i = 0; i < final.length; i++) {
        const arrayActual = final[i];
        if (arrayActual.length > 0) {
          const usuario = arrayActual[0].user;
          const fechaInicio = arrayActual[0].fecha;
          const fechaFin = arrayActual[arrayActual.length - 1].fecha;
          const rangoFechas = `${fechaInicio} al ${fechaFin}`;
          const totalDolares = arrayActual.reduce(
            (suma, item) => suma + item.dolares,
            0
          );
          if (totalDolares !== 0) {
            consolidado[i] = {
              user: usuario,
              fecha: rangoFechas,
              dolares: totalDolares.toFixed(2),
              quincena: id,
            };
          }
        }
      }
      const consolidadoArray = Object.values(consolidado);
      consolidadoArray.sort((a, b) => a.user.localeCompare(b.user));
      return consolidadoArray;
    });
  };

  const handlerSubmit = () => {
    dispatch(postStreamate(streamate, token));
    setInput([]);
    setCose([]);
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
          placeholder="Pegue aquí el corte de Streamate"
          titulo="Corte De Streamate"
        />
        <div className="mt-24">
          {errors && <p className="error">{errors.message}</p>}
        </div>
      </div>

      <div className="contenedor3">
        <div className="cotenedor4">
          <h2 className="titulo">Creditos a subir</h2>
          {streamate?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Dolares: {x.dolares}</p>
                  <p>Fecha: {x.fecha}</p>
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
                      <p>Coins: {x.coins}</p>
                      <p>Euros: {x.euros}</p>
                      <p>Fecha: {x.fecha}</p>
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

export default Streamate;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  postQuincena,
  getAllQuincena,
} from "../../redux/actions/registro/registerQuincena.js";
import { useNavigate } from "react-router-dom";

const RegistrarQuincena = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const quincenas = useSelector((state) => state.quincenas);
  const perror = useSelector((state) => state.perror);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(getAllQuincena(token));
  }, [dispatch]);
  const [quincena, setQuincena] = useState({
    nombreQuincena: "",
    fechaDeInicio: "",
    fechaFinal: "",
  });

  const [fechaInicio, setFechaInicio] = useState(null);
  const [error, setError] = useState("");

  const handleFechaDeInicio = (date) => {
    if (date) {
      setFechaInicio(date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      let fechaFinal = "";

      // Calcular la fecha final de la quincena
      if (day === 2) {
        fechaFinal = new Date(year, month, day + 14); // Agregar 14 días
      }
      // Si el día de inicio es el 02, la fecha final es el último día del mismo mes
      if (day === 17) {
        fechaFinal = new Date(year, month, day + 15); // Último día del mes actual
      }

      // Nombre del mes en lugar de número
      const options = { month: "long" };
      const monthNameInicio = new Intl.DateTimeFormat("es-ES", options).format(
        date
      );
      const monthNameFinal = new Intl.DateTimeFormat("es-ES", options).format(
        fechaFinal
      );
      const yearLastTwoDigits = year.toString().slice(-2);

      const nombreQuincena = `${monthNameInicio}-${
        day === 2 ? "1" : "2"
      }-${yearLastTwoDigits}`;

      // Verificar si la nueva quincena ya existe en la lista
      const quincenaExistente = quincenas.some(
        (q) => q.nombre === nombreQuincena
      );

      if (quincenaExistente) {
        // Mostrar mensaje de error
        setError("Quincena ya fue registrada");
      } else {
        // Limpiar el mensaje de error si no hay error
        setError("");

        // Actualizar el estado correctamente
        setQuincena({
          ...quincena,
          nombreQuincena: nombreQuincena,
          fechaDeInicio: date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          fechaFinal: fechaFinal.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        });
      }
    } else {
      // Limpiar el mensaje de error si se cancela la selección de la fecha
      setError("");
      setFechaInicio(null);
      setQuincena({
        ...quincena,
        fechaDeInicio: "",
        nombreQuincena: "",
        fechaFinal: "",
      });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault()
    // Verificar si hay algún mensaje de error antes de crear la quincena
    if (!error) {
      dispatch(postQuincena(quincena, token));
      setTimeout(() => {
        navigate('/crear')
      }, 1000)
    }
  };

  return (
    <div className="contenedor">
      <div>
        <div className="divTitulo">
          <h1 className="titulo">Registro De Quincenas</h1>
        </div>
        <form onSubmit={handleCreate}>
          <section className="sectionform">
            <section className="section">
              <div className="divlabel">
                <label className="label">Nombre Quincena:</label>
              </div>
              <div className="divinput">
                <p className="font-bold text-2xl bg-indigo-200 dark:bg-slate-600 flex h-6 p-4 items-center justify-center rounded-lg">
                  {quincena.nombreQuincena}
                </p>
              </div>
            </section>
            <section className="secion">
              <div className="divlabel">
                <label className="label">Fecha De Inicio:</label>
              </div>
              <div className="divinput">
                <DatePicker
                  selected={fechaInicio}
                  onChange={handleFechaDeInicio}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="18/08/2023"
                  dropdownMode="select"
                  filterDate={(date) =>
                    date.getDate() === 2 || date.getDate() === 17
                  }
                  customInput={<input type="text" className="input" />}
                />
              </div>
            </section>

            <section className="section">
              <div className="divlabel">
                <label className="label">Fecha Final:</label>
              </div>
              <div className="divinput">
                <p className="font-bold text-2xl bg-indigo-200 dark:bg-slate-600 flex h-6 p-4 items-center justify-center rounded-lg">
                  {quincena.fechaFinal}
                </p>
              </div>
            </section>

            {/* Mostrar mensaje de error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </section>
          <section className="sectionbtns">
            <button className="btns" type="submit" disabled={!!error}>
              <BiSend className="BiSend" />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegistrarQuincena;

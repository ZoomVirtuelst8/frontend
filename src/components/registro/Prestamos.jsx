import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import { getAllUserIdName } from "../../redux/actions/registro/registerUser";
import { getAllQuincena } from "../../redux/actions/registro/registerQuincena";
import { postPrestamos } from "../../redux/actions/registro/registerPrestamos";

const Prestamos = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUserIdName);
  const quincenas = useSelector((state) => state.quincenas);
  const token = useSelector(state => state.token)

  const handleQuincena = (event) => {
    setPrestamo({
      ...prestamo,
      quincenaId: event.target.value,
    });
  };

  const [prestamo, setPrestamo] = useState({
    quincenaId: "",
    userId: "",
    prestamo: "",
  });

  useEffect(() => {
    dispatch(getAllQuincena(token));
    dispatch(getAllUserIdName(token));
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
      setPrestamo({
        ...prestamo,
        quincenaId: quincenaActual.id,
      });
    }
  }, [quincenas]);

  const handleUser = (event) => {
    setPrestamo({
      ...prestamo,
      userId: event.target.value,
    });
  };
  const handlePrestamos = (event) => {
    setPrestamo({
      ...prestamo,
      prestamo: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(postPrestamos(prestamo, token));
  };
  return (
    <div className="contenedor">
      <div>
        <div className="divTitulo">
          <h1 className="titulo">Registro De Prestamos</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <section className="sectionform">
            <section className="divinput">
              <select
                className="select"
                onChange={handleQuincena}
                value={prestamo.quincenaId}
              >
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
            </section>
            <section className="divinput">
              <select className="select" onChange={handleUser}>
                <option value="">Seleccione Un usuario</option>
                {users &&
                  users.map((x) => {
                    return (
                      <option value={x.id} key={x.id}>
                        {x.nombre} {x.apellido}
                      </option>
                    );
                  })}
              </select>
            </section>
            <section className="section">
              <div className="divlabel">
              <label className="label">Cantidad</label>
              </div>
              <div className="divinput">
              <input
                type="number"
                className="no-spin input"
                name="prestamo"
                value={prestamo.prestamo}
                onChange={handlePrestamos}
                min="1"
              />
              </div>
            </section>
          </section>
          <section className="sectionbtns">
                <button className="btns" type="submit">
                  <BiSend className="BiSend" />
                </button>
              </section>
        </form>
      </div>
    </div>
  );
};

export default Prestamos;

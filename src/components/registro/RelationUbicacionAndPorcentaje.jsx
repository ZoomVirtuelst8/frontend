import React, { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/actions/registro/registerUser.js";
import { getAllUbicacion } from "../../redux/actions/registro/RegisterUbicacion.js";
import { getAllPorcentaje } from "../../redux/actions/registro/registerPorcentaje.js";
import { relationUbicationAndPorcentaje } from "../../redux/actions/registro/relationUbicationAndPorcentaje.js";
import ButtonAtras from "../resource/ButtonAtras.jsx";

const RelationUbicationAndPorcenaje = () => {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.allUser);
  const ubicacion = useSelector((state) => state.ubicaciones);
  const porcentaje = useSelector((state) => state.porcentajes);
  const token = useSelector((state) => state.token);

  const [ok, setOk] = useState({
    ubicacion: "",
    porcentaje: "",
  });
  const [input, setInput] = useState({
    user: "",
    ubicacion: "",
    porcentaje: "",
  });

  const [showUbication, setShowUbication] = useState(true);
  const [showPorcentaje, setShowPorcentaje] = useState(true);

  useEffect(() => {
    dispatch(getAllUser(token));
    dispatch(getAllPorcentaje(token));
    dispatch(getAllUbicacion(token));
  }, [dispatch]);

  const userSelect = allUser.find((x) => {
    return x.id === input.user;
  });

  useEffect(() => {
    setOk((prevOk) => {
      const newOk = { ...prevOk }; // Crear una copia del estado actual

      if (
        userSelect?.p_porcentaje !== null &&
        userSelect?.p_porcentaje !== undefined
      ) {
        setShowPorcentaje(false);
        newOk.porcentaje = "El usuario ya tiene porcentaje";
      } else {
        setShowPorcentaje(true);
        newOk.porcentaje = "";
      }

      if (
        userSelect?.p_ubicacion !== null &&
        userSelect?.p_ubicacion !== undefined
      ) {
        setShowUbication(false);
        newOk.ubicacion = "El usuario ya tiene Ubicacion";
      } else {
        setShowUbication(true);
        newOk.ubicacion = "";
      }

      return newOk; // Devolver el nuevo estado actualizado
    });
  }, [userSelect]);
  
  const handleUser = (event) => {
    setInput({
      ...input,
      user: event.target.value,
    });
  };

  const handlePorcentaje = (event) => {
    setInput({
      ...input,
      porcentaje: event.target.value,
    });
  };

  const handleUbicacion = (event) => {
    setInput({
      ...input,
      ubicacion: event.target.value,
    });
  };

  const handlerSubmit = () => {
    dispatch(relationUbicationAndPorcentaje(input, token));
  };

  return (
    <div className="contenedor">
      <ButtonAtras />
      <div className="">
        <div className="divTitulo">
          <h1 className="titulo">
            Relacion Ubicacion Y Porcentaje De Usuarios
          </h1>

          <form onSubmit={handlerSubmit}>
            <section className="sectionform">
              <h1 className="title2">
                Datos Laborales
              </h1>
              <section className="">
                <select
                  onChange={handleUser}
                  className="select"
                  value={input.user}
                >
                  <option value="">Seleccione usuario</option>
                  {allUser?.map((x) => {
                    return (
                      <option value={x.id} key={x.id} className="font-bold">
                        {x.nombre}
                      </option>
                    );
                  })}
                </select>
              </section>
              {ok && (
                <div className="text-center text-red-500 font-bold">
                  {ok.porcentaje}
                </div>
              )}
              {ok && (
                <div className="text-center text-red-500 font-bold">
                  {ok.ubicacion}
                </div>
              )}

              {showUbication && (
                <section>
                  <select
                    onChange={handleUbicacion}
                    value={input.ubicacion}
                    className="select"
                  >
                    <option value="" hidden>
                      Seleccione Una Ubicacion
                    </option>
                    {ubicacion?.map((x) => {
                      return (
                        <option value={x.id} key={x.id}>
                          {x.ubicacion}
                        </option>
                      );
                    })}
                  </select>
                </section>
              )}

              {showPorcentaje && (
                <section>
                  <select
                    onChange={handlePorcentaje}
                    value={input.porcentaje}
                    className="select"
                  >
                    <option value="" hidden>
                      Seleccione Un Porcentaje
                    </option>
                    {porcentaje?.map((x) => {
                      return (
                        <option value={x.id} key={x.id}>
                          {x.nombre}
                        </option>
                      );
                    })}
                  </select>
                </section>
              )}
            </section>

            <section className="flex items-center justify-center">
              <button className="btn-w w-auto font-bold text-4xl" type="submit">
                <BiSend />
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RelationUbicationAndPorcenaje;

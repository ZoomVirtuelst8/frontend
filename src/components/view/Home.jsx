import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moneda from "../resource/Moneda.jsx";
import { BiSend } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

import { resetError } from "../../redux/actions/resetError.js";
import {
  getAllQuincena,
  searchAllUserByFortnight,
} from "../../redux/actions/registro/registerQuincena.js";
import { postRojo } from "../../redux/actions/registro/registerRojo.js";
import { deleteCorte } from "../../redux/actions/paginas/adult.js";
import { deleteBonga } from "../../redux/actions/paginas/bonga.js";
import { deleteStreamate } from "../../redux/actions/paginas/streamate.js";
import { deletePrestamos } from "../../redux/actions/registro/registerPrestamos.js";
import { deleteVenta } from "../../redux/actions/registro/registerVenta.js";
import ButtonFoto from "../resource/ButtonFoto.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quincenas = useSelector((state) => state.quincenas);
  const quincenaHome = useSelector((state) => state.quincenaHome);
  const token = useSelector((state) => state.token);
  const perror = useSelector((state) => state.perror);
  const gerror = useSelector((state) => state.gerror);
  const [id, setId] = useState("");
  const [rojo, setRojo] = useState([]);
  useEffect(() => {
    dispatch(resetError(token));
  }, [id]);

  useEffect(() => {
    dispatch(getAllQuincena(token));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(searchAllUserByFortnight(id, token));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const quincenaActual = quincenas?.find((q) => {
      const quincenaInicio = q?.inicia;
      const partesFechaInicio = quincenaInicio?.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1;
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

      const quincenaFinal = q?.final;
      const partesFechaFinal = quincenaFinal?.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1;
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal, 23, 59, 59);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual && quincenaActual.id) {
      setId(quincenaActual.id);
    }
  }, [quincenas]);

  useEffect(() => {
    if (id.length > 1) {
      const selectedQuincena = quincenas.find((q) => q.id === id);
      const selectedQuincenaNombre = selectedQuincena.nombre;
      // Definir el nombre de la siguiente quincena basándote en la quincena seleccionada
      let nextQuincenaNombre;
      const yearLastTwoDigits = new Date().getFullYear().toString().slice(-2);

      switch (selectedQuincenaNombre) {
        case `enero-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `enero-2-${yearLastTwoDigits}`;
          break;
        case `enero-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `febrero-1-${yearLastTwoDigits}`;
          break;
        case `febrero-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `febrero-2-${yearLastTwoDigits}`;
          break;
        case `febrero-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `marzo-1-${yearLastTwoDigits}`;
          break;
        case `marzo-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `marzo-2-${yearLastTwoDigits}`;
          break;
        case `marzo-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `abril-1-${yearLastTwoDigits}`;
          break;
        case `abril-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `abril-2-${yearLastTwoDigits}`;
          break;
        case `abril-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `mayo-1-${yearLastTwoDigits}`;
          break;
        case `mayo-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `mayo-2-${yearLastTwoDigits}`;
          break;
        case `mayo-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `junio-1-${yearLastTwoDigits}`;
          break;
        case `junio-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `junio-2-${yearLastTwoDigits}`;
          break;
        case `junio-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `julio-1-${yearLastTwoDigits}`;
          break;
        case `julio-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `julio-2-${yearLastTwoDigits}`;
          break;
        case `julio-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `agosto-1-${yearLastTwoDigits}`;
          break;
        case `agosto-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `agosto-2-${yearLastTwoDigits}`;
          break;
        case `agosto-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `septiembre-1-${yearLastTwoDigits}`;
          break;
        case `septiembre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `septiembre-2-${yearLastTwoDigits}`;
          break;
        case `septiembre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `octubre-1-${yearLastTwoDigits}`;
          break;
        case `octubre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `octubre-2-${yearLastTwoDigits}`;
          break;
        case `octubre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `noviembre-1-${yearLastTwoDigits}`;
          break;
        case `noviembre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `noviembre-2-${yearLastTwoDigits}`;
          break;
        case `noviembre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `diciembre-1-${yearLastTwoDigits}`;
          break;
        case `diciembre-1-${yearLastTwoDigits}`:
          nextQuincenaNombre = `diciembre-2-${yearLastTwoDigits}`;
          break;
        case `diciembre-2-${yearLastTwoDigits}`:
          nextQuincenaNombre = `enero-1-${parseInt(yearLastTwoDigits, 10) + 1}`;
          break;
        case `diciembre-2-${parseInt(yearLastTwoDigits, 10) - 1}`:
          nextQuincenaNombre = `enero-1-${yearLastTwoDigits}`;
          break;
        default:
          return;
      }

      // Encontrar la siguiente quincena en la lista
      const nextQuincena = quincenas.find(
        (q) => q.nombre === nextQuincenaNombre
      );

      const modelosEnRojo = quincenaHome?.modelos?.filter(
        (modelo) => modelo?.totales?.saldo < 0
      );
      const modeloEnRojo = modelosEnRojo?.map((modelo) => ({
        id: modelo.id,
        nombre: modelo.nombre,
        apellido: modelo.apellido,
        rojo: modelo.totales.saldo,
        quincena: nextQuincena ? nextQuincena.id : "No hay quincena siguiente",
        quincenaNombre: nextQuincena
          ? nextQuincena.nombre
          : "No hay quincena siguiente",
      }));
      setRojo(modeloEnRojo);
    }
  }, [id, quincenaHome?.modelos]);

  const handleQuincena = (event) => {
    setId(event.target.value);
  };
  const [show, setShow] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });

  const [showDetail, setShowDetail] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });
  const [showBonga, setShowBonga] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });
  const [showStreamate, setShowStreamate] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });
  const [showPrestamos, setShowPrestamos] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });
  const [showVitrina, setShowVitrina] = useState(() => {
    const initialState = {};
    quincenaHome?.modelos?.forEach((modelo) => {
      initialState[modelo.id] = false;
    });
    return initialState;
  });

  const handleShow = (modeloId) => {
    setShow((prevShow) => ({
      ...prevShow,
      [modeloId]: !prevShow[modeloId],
    }));
    setShowDetail((prevShowDetail) => ({
      ...prevShowDetail,
      [modeloId]: false,
    }));
    setShowBonga((prevShowBonga) => ({
      ...prevShowBonga,
      [modeloId]: false,
    }));
    setShowStreamate((prevShowStreamate) => ({
      ...prevShowStreamate,
      [modeloId]: false,
    }));
    setShowPrestamos((prevShowPrestamos) => ({
      ...prevShowPrestamos,
      [modeloId]: false,
    }));
    setShowVitrina((prevShowVitrina) => ({
      ...prevShowVitrina,
      [modeloId]: false,
    }));
  };

  const handleShowDetail = (modeloId) => {
    setShowDetail((prevShowDetail) => ({
      ...prevShowDetail,
      [modeloId]: !prevShowDetail[modeloId],
    }));
  };
  const handleShowBonga = (modeloId) => {
    setShowBonga((prevShowBonga) => ({
      ...prevShowBonga,
      [modeloId]: !prevShowBonga[modeloId],
    }));
  };
  const handleShowStreamate = (modeloId) => {
    setShowStreamate((prevShowStreamate) => ({
      ...prevShowStreamate,
      [modeloId]: !prevShowStreamate[modeloId],
    }));
  };

  const handleDeleteAdult = (id) => {
    dispatch(deleteCorte(id, token));
  };
  const handleDeleteBonga = (id) => {
    dispatch(deleteBonga(id, token));
  };
  const handleDeleteStreamate = (id) => {
    dispatch(deleteStreamate(id, token));
  };

  const handleShowPrestamos = (modeloId) => {
    setShowPrestamos((prevShowPrestamos) => {
      const shouldShowPrestamos = !prevShowPrestamos[modeloId];
      return {
        ...prevShowPrestamos,
        [modeloId]: shouldShowPrestamos,
      };
    });

    // Utilizamos la función de devolución de llamada para asegurar que estamos
    // trabajando con el valor más reciente de show
    setShow((prevShow) => {
      if (!prevShow[modeloId]) {
        setShowPrestamos((prevShowPrestamos) => ({
          ...prevShowPrestamos,
          [modeloId]: false,
        }));
      }
      return prevShow;
    });
  };
  const handleShowVitrina = (modeloId) => {
    setShowVitrina((prevShowVitrina) => {
      const shouldShowVitrina = !prevShowVitrina[modeloId];
      return {
        ...prevShowVitrina,
        [modeloId]: shouldShowVitrina,
      };
    });
  };

  const handleRojo = () => {
    if (rojo.length >= 1) {
      dispatch(postRojo(rojo, token));
      setRojo([]);
    }
  };
  const [showRojos, setShowRojos] = useState(false);
  useEffect(() => {
    setRojo([]),
      setShowRojos(false),
      setShowDetail(false),
      setShowPrestamos(false),
      setShowVitrina(false);
    setShowBonga(false);
    setShowStreamate(false);
  }, [id]);
  const handleRojos = () => {
    showRojos ? setShowRojos(false) : setShowRojos(true);
  };
  const handleDeletePrestamo = (id) => {
    dispatch(deletePrestamos(id, token));
  };
  const handleDeleteVitrina = (id) => {
    dispatch(deleteVenta(id, token));
  };
  const handleEditPrestamo = (id) => {
    navigate(`/editar/prestamo/${id}`);
  };

  const sectionRef = useRef([]);
  console.log(quincenaHome)
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div>
          <select onChange={handleQuincena} value={id} className="select">
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

        {quincenaHome && quincenaHome?.moneda ? (
          <Moneda quincena={quincenaHome?.moneda} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}

        {showRojos && (
          <div className="overflow-x-auto px-2 py-2 bg-red-500 dark:bg-red-700 border-4 border-black dark:border-black m-1 ">
            {" "}
            <h1 className="text-xl font-bold">SALDO ROJO</h1>
            <div>
              {rojo?.map((x, index) => {
                return (
                  <section
                    className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-4 border-black dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                    key={index}
                  >
                    <div className="divPageRojo">
                      <h1>#</h1>
                      <h2>{index + 1}</h2>
                    </div>
                    <div className="divPageRojo">
                      <h1>nombre</h1>
                      <h2>{x?.nombre}</h2>
                    </div>
                    <div className="divPageRojo">
                      <h1>apellido</h1>
                      <h2>{x?.apellido}</h2>
                    </div>
                    <div className="divPageRojo">
                      <h1>rojo</h1>
                      <h2>
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(x?.rojo)}
                      </h2>
                    </div>
                    <div className="divPageRojo">
                      <h1>para</h1>
                      <h2>{x?.quincenaNombre}</h2>
                    </div>
                  </section>
                );
              })}
            </div>
            {rojo?.length > 0 && (
              <section className="flex items-center justify-center">
                <button
                  className="btns w-auto font-bold text-4xl"
                  onClick={handleRojo}
                >
                  <BiSend />
                </button>
              </section>
            )}
          </div>
        )}

        <div className="pb-8">
          <div className="mx-2 bg-indigo-300 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-2xl border-4 border-indigo-400">
            {rojo?.length > 0 && (
              <button className="btn-rojos" onClick={() => handleRojos()}>
                Generar Rojos
              </button>
            )}

            <div>
              {quincenaHome?.modelos?.map((x) => {
                if (
                  x?.totales?.saldo !== 0 ||
                  x?.totales?.rojo !== 0 ||
                  x?.totales?.totalCreditos > 0 ||
                  x?.totales?.totalPrestamos > 0 ||
                  x?.totales?.totalVitrina > 0
                )
                  return (
                    <div
                      key={x.id}
                      className="divPageContainer  "
                      ref={(el) => (sectionRef[x.id] = el)}
                    >
                      <div>
                        <h1 className="text-2xl font-bold">
                          {x.nombre} {x.apellido}
                        </h1>

                        <section
                          className=" my-2 grid sm:grid-cols-2 sm:text-sm md:grid-cols-5 lg:grid-cols-10 uppercase"
                          onClick={() => handleShow(x?.id)}
                        >
                          {/*//? nombre porcentaje */}
                          <div className="dht">
                            <h1 className="py-2">porcentaje</h1>
                            {x?.porcentaje && <h2>{x?.porcentaje?.nombre}</h2>}
                          </div>
                          {/*//? meta */}
                          <div className="dht">
                            <h1>meta</h1>
                            {x?.porcentaje && (
                              <h1>
                                {Intl.NumberFormat("es-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.porcentaje?.meta)}
                              </h1>
                            )}
                          </div>
                          {/*//? total creditos */}
                          <div className="dht">
                            <h1>total creditos</h1>
                            {x?.totales && (
                              <h1>
                                {Intl.NumberFormat("es-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.totalCreditos)}
                              </h1>
                            )}
                          </div>
                          {/* //? porcentaje */}
                          <div className="dht">
                            <h1>porcentaje</h1>
                            {x?.totales?.porcentajeFinal && (
                              <h1>{x?.totales?.porcentajeFinal}%</h1>
                            )}
                          </div>

                          {/* //? rojo */}
                          <div className="dht">
                            <h1>rojo</h1>
                            {x?.totales?.rojo && (
                              <h1>
                                {Intl.NumberFormat("es-CO", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.rojo) || 0}
                              </h1>
                            )}
                          </div>

                          {/* //? intereses */}
                          <div className="dht">
                            <h1>interes</h1>
                            {x?.totales?.interes && (
                              <h1>
                                {Intl.NumberFormat("es-CO", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.interes) || 0}
                              </h1>
                            )}
                          </div>

                          {/* //? total prestamos */}
                          <div className="dht">
                            <h1>total prestamos</h1>
                            {x?.totales?.totalPrestamos && (
                              <h1>
                                {Intl.NumberFormat("es-CO", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.totalPrestamos)}
                              </h1>
                            )}
                          </div>

                          {/* //? total vitrina */}
                          <div className="dht">
                            <h1>total vitrina</h1>
                            {x?.totales?.totalVitrina && (
                              <h1>
                                {Intl.NumberFormat("es-CO", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.totalVitrina)}
                              </h1>
                            )}
                          </div>

                          {/* //? total pesos */}
                          <div className="dht">
                            <h1>total pesos</h1>
                            {x?.totales?.totalPesos && (
                              <h1>
                                {Intl.NumberFormat("es-CO", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.totalPesos)}
                              </h1>
                            )}
                          </div>

                          {/* //? saldo */}
                          <div
                            className={
                              x?.totales?.saldo > 0
                                ? "saldoPositivo p-3 border-2 border-indigo-700 dark:border-slate-400 m-0.5"
                                : "saldoRojo p-3 border-2 border-indigo-700 dark:border-slate-400 m-0.5"
                            }
                          >
                            <h1>saldo</h1>
                            {x?.totales?.saldo && (
                              <h1>
                                {Intl.NumberFormat("es-CO", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(x?.totales?.saldo)}
                              </h1>
                            )}
                          </div>
                        </section>

                        {show[x?.id] && x?.totales?.saldo !== 0 && (
                          <div className="divPages">
                            {x?.adultworkTotal && (
                              <section
                                className="sectionPage1 cursor-pointer"
                                onClick={() => handleShowDetail(x?.id)}
                              >
                                <h1>Adultwork</h1>
                                <h1>Libras</h1>
                                <h2>
                                  {Intl.NumberFormat("en-GB", {
                                    style: "currency",
                                    currency: "GBP",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(
                                    parseFloat(x?.adultworkTotal?.creditos)
                                  )}
                                </h2>
                              </section>
                            )}

                            {x?.amateur && (
                              <section className="sectionPage1">
                                <h1>Amateur</h1>
                                <section className="sectionPage2">
                                  <section>
                                    <h1>dolares</h1>
                                    <h2>
                                      {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.amateur?.dolares)}
                                    </h2>
                                  </section>
                                  <section>
                                    <h1>Tokens</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.amateur?.tokens)}
                                    </h2>
                                  </section>
                                </section>
                              </section>
                            )}

                            {x?.bongaTotal && (
                              <section
                                className="sectionPage1 cursor-pointer"
                                onClick={() => handleShowBonga(x?.id)}
                              >
                                <h1>Bonga</h1>
                                <h1>Dolares</h1>
                                <h2>
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.bongaTotal?.dolares)}
                                </h2>
                              </section>
                            )}

                            {x?.cam4 && (
                              <section className="sectionPage1">
                                <h1>Cam4</h1>
                                <h1>Dolares</h1>
                                <h2>
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.cam4?.dolares)}
                                </h2>
                              </section>
                            )}

                            {x?.chaturbate && (
                              <section className="sectionPage1">
                                <h1>Chaturbate</h1>
                                <section className="sectionPage2">
                                  <section>
                                    <h1>Tokens </h1>
                                    <h2>
                                      {Intl.NumberFormat("es-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.chaturbate?.tokens)}
                                    </h2>
                                  </section>
                                  <section>
                                    <h1>Dolares </h1>
                                    <h2>
                                      {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.chaturbate?.dolares)}
                                    </h2>
                                  </section>
                                </section>
                              </section>
                            )}

                            {x?.dirty && (
                              <section className="sectionPage1">
                                <h1>Dirty</h1>
                                <h1>
                                  {x?.dirty?.moneda === "euro"
                                    ? "Euros"
                                    : "Dolar"}
                                </h1>
                                <h2>{x?.dirty?.plata}</h2>
                              </section>
                            )}

                            {x?.islive && (
                              <section className="sectionPage1">
                                <h1>Is Live</h1>
                                <h1>Euros</h1>
                                <h2>
                                  {Intl.NumberFormat("es-EU", {
                                    style: "currency",
                                    currency: "EUR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.islive?.euros)}
                                </h2>
                              </section>
                            )}

                            {x?.mondo && (
                              <section className="sectionPage1">
                                <h1>Mondo</h1>
                                <h1>Euros</h1>
                                <h2>
                                  {Intl.NumberFormat("es-EU", {
                                    style: "currency",
                                    currency: "EUR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.mondo?.euros)}
                                </h2>
                              </section>
                            )}

                            {x?.myFreeCams && (
                              <section className="sectionPage1">
                                <h1>My Free Cams</h1>
                                <section className="sectionPage2">
                                  <section>
                                    <h1>Dolares</h1>
                                    <h2>
                                      {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.myFreeCams?.dolares)}
                                    </h2>
                                  </section>
                                  <section>
                                    <h1>Tokens</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.myFreeCams?.tokens)}
                                    </h2>
                                  </section>
                                </section>
                              </section>
                            )}

                            {x?.sakura && (
                              <section className="sectionPage1">
                                <h1>Sakura</h1>
                                <h1>Dolares</h1>
                                <h2>
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.sakura?.dolares)}
                                </h2>
                              </section>
                            )}

                            {x?.sender && (
                              <section className="sectionPage1">
                                <h1>Sender</h1>
                                <section>
                                  <section className="sectionPage2">
                                    <h1>Euros</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-EU", {
                                        style: "currency",
                                        currency: "EUR",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.senderAnterior?parseFloat(x?.sender?.euros - x?.senderAnterior?.euros):x?.sender?.euros)}
                                    </h2>
                                  </section>
                                  <section className="sectionPage2">
                                    <h1>Tokens</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(
                                        x?.senderAnterior?.coins
                                          ? x?.sender?.coins -
                                              x?.senderAnterior?.coins
                                          : x?.sender?.coins
                                      )}
                                    </h2>
                                  </section>
                                </section>
                              </section>
                            )}

                            {x?.skype && (
                              <section className="sectionPage1">
                                <h1>Skype</h1>
                                <h1>Dolares</h1>
                                <h2>
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.skype?.dolares)}
                                </h2>
                              </section>
                            )}

                            {x?.streamate && (
                              <section
                                className="sectionPage1 cursor-pointer"
                                onClick={() => handleShowStreamate(x?.id)}
                              >
                                <h1>Streamate</h1>
                                <h1>Dolares</h1>
                                <h2>
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.streamateTotal?.dolares)}
                                </h2>
                              </section>
                            )}

                            {x?.streamRay && (
                              <section className="sectionPage1">
                                <h1>StreamRay</h1>
                                <h1>Dolares</h1>
                                <h2>
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.streamRay?.dolares)}
                                </h2>
                              </section>
                            )}

                            {x?.stripchat && (
                              <section className="sectionPage1">
                                <h1>Stripchat</h1>
                                <section className="sectionPage2">
                                  <section>
                                    <h1>Dolares</h1>
                                    <h2>
                                      {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.stripchat?.dolares)}
                                    </h2>
                                  </section>
                                  <section>
                                    <h1>Tokens</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.stripchat?.tokens)}
                                    </h2>
                                  </section>
                                </section>
                              </section>
                            )}

                            {x?.tripleSiete && (
                              <section className="sectionPage1">
                                <h1>777</h1>
                                <section>
                                  <h1>Dolares</h1>
                                  <h2>
                                    {Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(x?.tripleSiete?.dolares)}
                                  </h2>
                                </section>
                              </section>
                            )}

                            {x?.vx && (
                              <section className="sectionPage1">
                                <h1>Vx</h1>
                                <h1>Euros</h1>
                                <h2>
                                  {Intl.NumberFormat("es-EU", {
                                    style: "currency",
                                    currency: "EUR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.vx?.euros)}
                                </h2>
                              </section>
                            )}

                            {x?.xlove && (
                              <section className="sectionPage1">
                                <h1>Xlove</h1>
                                <h1>Euros</h1>
                                <h2>
                                  {Intl.NumberFormat("es-EU", {
                                    style: "currency",
                                    currency: "EUR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.xlove?.euros)}
                                </h2>
                              </section>
                            )}

                            {x?.xlovenueva && (
                              <section className="sectionPage1">
                                <h1>Xlove Nueva</h1>
                                <h1>Euros</h1>
                                <h2>
                                  {Intl.NumberFormat("es-EU", {
                                    style: "currency",
                                    currency: "EUR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(x?.xlovenueva?.euros)}
                                </h2>
                                {/* <h1>Fecha</h1> <h2>{x?.xlovenueva?.fecha}</h2> */}
                              </section>
                            )}

                            {x?.prestamos && (
                              <section
                                className="sectionPage1 cursor-pointer"
                                onClick={() => handleShowPrestamos(x?.id)}
                              >
                                <h1>Prestamos</h1>
                                <section className="sectionPage2">
                                  <section>
                                    <h1>Total</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.totales?.totalPrestamos)}
                                    </h2>
                                  </section>
                                  <section>
                                    <h1>Cantidad</h1>
                                    <h2>{x?.prestamos.length}</h2>
                                  </section>
                                </section>
                              </section>
                            )}
                            {x?.vitrina && (
                              <section
                                className="sectionPage1 cursor-pointer"
                                onClick={() => handleShowVitrina(x?.id)}
                              >
                                <h1>Vitrina</h1>
                                <section className="sectionPage2">
                                  <section>
                                    <h1>Total</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(x?.totales?.totalVitrina)}
                                    </h2>
                                  </section>
                                  <section>
                                    <h1>Cantidad</h1>{" "}
                                    <h2>{x?.vitrina.length}</h2>
                                  </section>
                                </section>
                              </section>
                            )}
                          </div>
                        )}
                      </div>
                      <ButtonFoto
                        sectionRef={sectionRef[x.id]}
                        nombre={x.nombre}
                        apellido={x.apellido}
                        id={x.id}
                        quincena={quincenaHome?.moneda?.nombre}
                      />

                      {showDetail[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2 bg-indigo-300 dark:bg-slate-700 border-4 border-indigo-700 dark:border-black m-1 ">
                          <h1 className="text-xl font-bold m-2">
                            CORTES ADULTWORK
                          </h1>
                          <div>
                            {x?.adultwork?.map((detalle, index) => (
                              <section
                                className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                                key={index}
                              >
                                <div className="divPageAdult">
                                  <h1>#</h1>
                                  <h2>{index + 1}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>username</h1>
                                  <h2>{detalle?.userName}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>libras</h1>
                                  <h2>
                                    {Intl.NumberFormat("en-GB", {
                                      style: "currency",
                                      currency: "GBP",
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(detalle?.creditos)}
                                  </h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>tipo</h1>
                                  <h2>
                                    {detalle?.parcial ? "Parcial" : "Regular"}
                                  </h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>fecha adultwork</h1>
                                  <h2>
                                    {detalle?.parcial
                                      ? detalle?.createdAt
                                      : detalle?.fecha}
                                  </h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>eliminar</h1>
                                  <h2>
                                    <button
                                      className="btns w-10"
                                      onClick={() =>
                                        handleDeleteAdult(detalle.id)
                                      }
                                    >
                                      <RiDeleteBin6Line className="text-2xl" />
                                    </button>
                                  </h2>
                                </div>
                              </section>
                            ))}
                          </div>
                        </div>
                      )}
                      {showBonga[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2 bg-indigo-300 dark:bg-slate-700 border-4 border-indigo-700 dark:border-black m-1 ">
                          <h1 className="text-xl font-bold m-2">
                            CORTES BONGA
                          </h1>
                          <div>
                            {x?.bonga?.map((detalle, index) => (
                              <section
                                className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                                key={index}
                              >
                                <div className="divPageAdult">
                                  <h1>#</h1>
                                  <h2>{index + 1}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>username</h1>
                                  <h2>{detalle?.userName}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>dolares</h1>
                                  <h2>
                                    {Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(detalle?.dolares)}
                                  </h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>fecha bonga</h1>
                                  <h2>{detalle?.fecha}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>eliminar</h1>
                                  <h2>
                                    <button
                                      className="btns"
                                      onClick={() =>
                                        handleDeleteBonga(detalle.id)
                                      }
                                    >
                                      <RiDeleteBin6Line className="text-2xl" />
                                    </button>
                                  </h2>
                                </div>
                              </section>
                            ))}
                          </div>
                        </div>
                      )}
                      {showStreamate[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2 bg-indigo-300 dark:bg-slate-700 border-4 border-indigo-700 dark:border-black m-1 ">
                          <h1 className="text-xl font-bold m-2">
                            CORTES STREAMATE
                          </h1>
                          <div>
                            {x?.streamate?.map((detalle, index) => (
                              <section
                                className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                                key={index}
                              >
                                <div className="divPageAdult">
                                  <h1>#</h1>
                                  <h2>{index + 1}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>username</h1>
                                  <h2>{detalle?.userName}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>dolares</h1>
                                  <h2>
                                    {Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(detalle?.dolares)}
                                  </h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>fecha streamate</h1>
                                  <h2>{detalle?.fecha}</h2>
                                </div>
                                <div className="divPageAdult">
                                  <h1>eliminar</h1>
                                  <h2>
                                    <button
                                      className="btns"
                                      onClick={() =>
                                        handleDeleteStreamate(detalle.id)
                                      }
                                    >
                                      <RiDeleteBin6Line className="text-2xl" />
                                    </button>
                                  </h2>
                                </div>
                              </section>
                            ))}
                          </div>
                        </div>
                      )}
                      {showPrestamos[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2 bg-indigo-300 dark:bg-slate-700 border-4 border-indigo-700 dark:border-black m-1 ">
                          <h1 className="text-xl font-bold m-2">
                            PRESTAMOS DETALLADOS
                          </h1>
                          <div>
                            {x?.prestamos?.map((p, n) => {
                              const fecha = new Date(p?.createdAt);
                              const opcionesFecha = {
                                day: "numeric",
                                month: "short",
                                year: "2-digit",
                              };
                              const fechaFormateada = fecha.toLocaleDateString(
                                "es-ES",
                                opcionesFecha
                              );
                              return (
                                <section
                                  key={n}
                                  className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                                >
                                  <div className="divPageAdult">
                                    <h1>#</h1>
                                    <h2>{n + 1}</h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>fecha</h1>
                                    <h2>{fechaFormateada}</h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>valor</h1>
                                    <h2>
                                      {Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(p?.cantidad)}
                                    </h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>editar</h1>
                                    <h2>
                                      <button
                                        className="btns"
                                        onClick={() => handleEditPrestamo(p.id)}
                                      >
                                        <GrEdit className="text-2xl" />
                                      </button>
                                    </h2>
                                  </div>

                                  <div className="divPageAdult">
                                    <h1>eliminar</h1>
                                    <h2>
                                      <button
                                        className="btns"
                                        onClick={() =>
                                          handleDeletePrestamo(p.id)
                                        }
                                      >
                                        <RiDeleteBin6Line className="text-2xl" />
                                      </button>
                                    </h2>
                                  </div>
                                </section>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {showVitrina[x?.id] && (
                        <div className="overflow-x-auto px-2 py-2 bg-indigo-300 dark:bg-slate-700 border-4 border-indigo-700 dark:border-black m-1 ">
                          <h1 className="text-xl font-bold m-2">
                            VITRINA DETALLADO
                          </h1>
                          <div>
                            {x?.vitrina?.map((p, n) => {
                              const fecha = new Date(p?.createdAt);
                              const opcionesFecha = {
                                day: "numeric",
                                month: "short",
                                year: "2-digit",
                              };
                              const fechaFormateada = fecha.toLocaleDateString(
                                "es-ES",
                                opcionesFecha
                              );

                              return (
                                <section
                                  key={n}
                                  className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                                >
                                  <div className="divPageAdult">
                                    <h1>#</h1>
                                    <h2>{n + 1}</h2>
                                  </div>

                                  <div className="divPageAdult">
                                    <h1>fecha</h1>
                                    <h2>{fechaFormateada}</h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>nombre</h1>
                                    <h2>{p?.nombre}</h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>valor</h1>
                                    <h2>
                                      {Intl.NumberFormat("ES-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(p?.valor)}
                                    </h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>cantidad</h1>
                                    <h2>{p?.cantidad}</h2>
                                  </div>
                                  <div className="divPageAdult">
                                    <h1>eliminar</h1>
                                    <h2>
                                      <button
                                        className="btns"
                                        onClick={() =>
                                          handleDeleteVitrina(p.id)
                                        }
                                      >
                                        <RiDeleteBin6Line className="text-2xl" />
                                      </button>
                                    </h2>
                                  </div>
                                </section>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

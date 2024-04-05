import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moneda from "../resource/Moneda.jsx";
import { useParams } from "react-router-dom";

import {
  getAllQuincena,
  searchUserByFortnight,
} from "../../redux/actions/registro/registerQuincena.js";
import { resetError } from "../../redux/actions/resetError.js";
import { jwtDecode } from "jwt-decode";

const User = () => {
  const dispatch = useDispatch();
  const quincenas = useSelector((state) => state.quincenas);
  const user = useSelector((state) => state.quincenaUser);
  const token = useSelector((state) => state.token);
  const actual = jwtDecode(token);
  const [ids, setIds] = useState("");

  useEffect(() => {
    dispatch(resetError(token));
  }, [ids]);

  useEffect(() => {
    dispatch(getAllQuincena(token));
  }, [dispatch]);

  useEffect(() => {
    ids || ids !== ""
      ? dispatch(searchUserByFortnight(ids, actual.id, token))
      : "";
  }, [ids]);

  useEffect(() => {
    // Encontrar la quincena que coincide con la fecha actual
    const quincenaActual = quincenas.find((q) => {
      const quincenaInicio = q?.inicia;
      const partesFechaInicio = quincenaInicio.split("/");

      // Obtén el día, el mes y el año como números
      const diaInicio = parseInt(partesFechaInicio[0], 10);
      const mesInicio = parseInt(partesFechaInicio[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      const añoInicio = parseInt(partesFechaInicio[2], 10);

      // Crea un objeto de fecha
      const fechaInicio = new Date(añoInicio, mesInicio, diaInicio);

      const quincenaFinal = q?.final;
      const partesFechaFinal = quincenaFinal.split("/");

      // Obtén el día, el mes y el año como números
      const diaFinal = parseInt(partesFechaFinal[0], 10);
      const mesFinal = parseInt(partesFechaFinal[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
      const añoFinal = parseInt(partesFechaFinal[2], 10);

      // Crea un objeto de fecha
      const fechaFinal = new Date(añoFinal, mesFinal, diaFinal, 23, 59, 59);

      const fechaActual = new Date();

      return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
    });

    if (quincenaActual) {
      setIds(quincenaActual?.id); // Establecer la quincena actual como valor predeterminado en el selector
    }
  }, [quincenas]);

  const handleQuincena = (event) => {
    setIds(event.target.value);
  };

  const [showDetail, setShowDetail] = useState(false);
  const [showDetailBonga, setShowDetailBonga] = useState(false);
  const [showDetailStreamate, setShowDetailStreamate] = useState(false);
  const [showDetailPrestamos, setShowDetailPrestamos] = useState(false);
  const [showDetailVitrina, setShowDetailVitrina] = useState(false);

  useEffect(() => {
    setShowDetail(false)
    setShowDetailBonga(false)
    setShowDetailStreamate(false)
    setShowDetailPrestamos(false)
    setShowDetailVitrina(false)
  }, [ids])
  const handleShowDetail = () => {
    setShowDetail((prev) => !prev);
    setShowDetailBonga(false);
    setShowDetailStreamate(false);
    setShowDetailPrestamos(false);
    setShowDetailVitrina(false);
  };

  const handleShowDetailBonga = () => {
    setShowDetail(false);
    setShowDetailBonga((prev) => !prev);
    setShowDetailStreamate(false);
    setShowDetailPrestamos(false);
    setShowDetailVitrina(false);
  };

  const handleShowDetailStreamate = () => {
    setShowDetail(false);
    setShowDetailBonga(false);
    setShowDetailStreamate((prev) => !prev);
    setShowDetailPrestamos(false);
    setShowDetailVitrina(false);
  };
  const handleShowDetailPrestamos = () => {
    setShowDetail(false);
    setShowDetailBonga(false);
    setShowDetailStreamate(false);
    setShowDetailPrestamos((prev) => !prev);
    setShowDetailVitrina(false);
  };
  const handleShowDetailVitrina = () => {
    setShowDetail(false);
    setShowDetailBonga(false);
    setShowDetailStreamate(false);
    setShowDetailPrestamos(false);
    setShowDetailVitrina((prev) => !prev);
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2 ">
        <div>
          <select onChange={handleQuincena} value={ids} className="select">
            <option value="">Seleccione Una Quincena</option>
            {quincenas &&
              quincenas?.map((x) => {
                return (
                  <option value={x.id} key={x.id}>
                    {x?.nombre}
                  </option>
                );
              })}
          </select>
        </div>

        {user && user?.moneda?.nombre ? (
          <Moneda quincena={user?.moneda} />
        ) : (
          <div className="loade1 m-auto my-2"></div>
        )}

        <div className="pb-28 m-2">
          <h1 className=" font-bold text-3xl">
            {user && user?.nombre?.split(" ")[0]}{" "}
            {user && user?.apellido?.split(" ")[0]}
          </h1>

          <section className="grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 dark:bg-slate-500 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
            <div className="divPageUser">
              <h1>porcentaje</h1>
              {user?.porcentaje && <h2>{user.porcentaje?.nombre}</h2>}
            </div>
            <div className="divPageUser">
              <h1>meta</h1>
              {user?.porcentaje && <h2>{user.porcentaje?.meta}</h2>}
            </div>
            <div className="divPageUser">
              <h1>total creditos</h1>
                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.totales?.totalCreditos)}
                  </h2>
                )}

            </div>
            <div className="divPageUser">
              <h1>porcentaje</h1>
                {user?.totales && <h2>{user?.totales?.porcentajeFinal} %</h2>}
            </div>
            <div className="divPageUser">
              <h1>rojo</h1>
                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(user?.totales?.rojo)}
                  </h2>
                )}
            </div>
            <div className="divPageUser">
              <h1>interes</h1>
                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(user?.totales?.interes)}
                  </h2>
                )}
            </div>
            <div
              className="divPageUser"
              onClick={handleShowDetailPrestamos}
              style={{ cursor: "pointer" }}
            >
              <h1>total prestamos</h1>
                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.totales?.totalPrestamos)}{" "}
                  </h2>
                )}
            </div>
            <div
              className="divPageUser"
              onClick={handleShowDetailVitrina}
              style={{ cursor: "pointer" }}
            >
              <h1>total vitrina</h1>

                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.totales?.totalVitrina)}
                  </h2>
                )}

            </div>
            <div className="divPageUser">
              <h1>total pesos</h1>
                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.totales?.totalPesos)}
                  </h2>
                )}
            </div>
            <div
              className={
                user?.totales?.saldo > 0
                  ? "saldoPositivo  border-2 border-indigo-700 dark:border-black m-0.5"
                  : "saldoRojo  border-2 border-indigo-700 dark:border-black m-0.5"
              }
            >
              <h1 className="uppercase border-b-2 border-indigo-900 dark:border-black">saldo</h1>
                {user?.totales && (
                  <h2>
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.totales?.saldo)}
                  </h2>
                )}
            </div>
          </section>

          <div className="my-2">
            {showDetailPrestamos && user?.prestamos?.length > 0 && (
              <div className=" m-2 p-2 border-4 border-indigo-900 dark:border-black rounded-2xl bg-indigo-300 dark:bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">PRESTAMOS</h1>
                  <div>
                    {user?.prestamos?.map((detalle, index) => {
                      const fecha = new Date(detalle?.createdAt);

                      const dia = fecha.getDate();
                      const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
                      const ano = fecha.getFullYear();

                      const fechaFormateada = `${dia}/${mes}/${ano}`;
                      return (
                        <section
                          key={index}
                          className="grid sm:grid-cols-1 md:grid-cols-3  border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                        >
                          <div className="divPageAdult">
                            <h1>#</h1>
                            <h2>{index + 1}</h2>
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
                              }).format(detalle?.cantidad)}
                            </h2>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {showDetailVitrina && user?.ventas?.length > 0 && (
              <div className=" m-2 p-2 border-4 border-indigo-900 dark:border-black rounded-2xl bg-indigo-300 dark:bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">VITRINA</h1>
                  <div>
                    {user?.ventas?.map((p, n) => {
                      const fecha = new Date(p?.createdAt);

                      const dia = fecha.getDate();
                      const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
                      const ano = fecha.getFullYear();

                      const fechaFormateada = `${dia}/${mes}/${ano}`;
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
                            <h1>nombre</h1>
                            <h2>{p?.nombre}</h2>
                          </div>
                          <div className="divPageAdult">
                            <h1>cantidad</h1>
                            <h2>{p?.cantidad}</h2>
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
                        </section>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {user?.adultwork && (
              <section
                className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                onClick={handleShowDetail}
                style={{ cursor: "pointer" }}
              >
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="font-bold bg-white max-w-fit mx-auto rounded-xl m-1 p-1 flex justify-center items-center">
                    <img
                      src="/AWLogo_on.png"
                      alt="logo adultwork"
                      className="w-32 h-10"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.adultwork && <h2>{user?.adultwork[0]?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.adultwork && <h2>{user?.adultwork?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.adultwork && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.adultwork && (
                    <h2>
                      {Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.adultworkTotal)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.adultwork && user?.totales?.libra && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.adultworkTotal *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.libra
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {showDetail && (
              <div className="m-2 p-2 border-4 border-indigo-900 dark:border-black rounded-2xl  bottom-2 bg-indigo-300 dark:bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">CORTES ADULTWORK</h1>
                  <div>
                    {user?.adultwork?.map((detalle, index) => (
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
                          <h1>libras</h1>
                          <h2>
                            {Intl.NumberFormat("en-GB", {
                              style: "currency",
                              currency: "GBP",
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            }).format(detalle?.creditos)}
                          </h2>
                        </div>
                        <div className="divPageAdult">
                          <h1>tipo</h1>
                          <h2>{detalle?.parcial ? "Parcial" : "Regular"}</h2>
                        </div>
                        <div className="divPageAdult">
                          <h1>fecha adultwork</h1>
                          <h2>
                            {detalle?.parcial
                              ? detalle?.createdAt
                              : detalle?.fecha}
                          </h2>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {user?.amateur && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-red-600 rounded-xl p-2 h-10 w-32 mx-auto m-1 flex justify-center items-center">
                    <img src="/Amateur.png" alt="logo Amateur" />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.amateur && <h2>{user?.amateur?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.amateur && <h2>{user?.amateur?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.amateur && (
                    <h2>
                      {Intl.NumberFormat("es-IN").format(user?.amateur?.tokens)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.amateur && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.amateur.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.amateur && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.amateur?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.bonga && (
              <section
                className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                onClick={handleShowDetailBonga}
                style={{ cursor: "pointer" }}
              >
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="mx-auto m-1 flex justify-center items-center">
                    <img
                      src="/bonga.jpeg"
                      alt="logo bonga"
                      className="w-32 h-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.bonga && <h2>{user?.bonga[0]?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.bonga && <h2>{user?.bonga?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.bonga && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.bonga && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.bongaTotal)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.bonga && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.bongaTotal * user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {showDetailBonga && (
              <div className=" m-2 p-2 border-4 border-indigo-900 dark:border-black rounded-2xl bg-indigo-300 dark:bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">CORTES BONGA</h1>
                  <div>
                    {user?.bonga?.map((detalle, index) => (
                      <section
                        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
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
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {user?.cam4 && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-black rounded-xl h-10 p-2 w-32 flex justify-center items-center mx-auto m-1">
                    <img src="/Cam4.png" alt="logo Cam4" />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.cam4 && <h2>{user?.cam4?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.cam4 && <h2>{user?.cam4?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.cam4 && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.cam4 && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.cam4.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.cam4 && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.cam4?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.chaturbate && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>

                  <div className=" bg-slate-200 mx-auto m-1 p-2 h-10 w-32 rounded-xl flex justify-center items-center ">
                    <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.chaturbate && <h2>{user?.chaturbate?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.chaturbate && <h2>{user?.chaturbate?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.chaturbate && (
                    <h2>
                      {Intl.NumberFormat("IN").format(user?.chaturbate?.tokens)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.chaturbate && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.chaturbate?.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.chaturbate && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.chaturbate?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.dirty && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>

                  <div className="bg-stone-900 p-2 rounded-xl h-10 w-32 mx-auto m-1 flex justify-center items-center">
                    <img src="/mydirty.png" alt="logo Dirty" />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.dirty && <h2>{user?.dirty?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.dirty && <h2>{user?.dirty?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.dirty && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.dirty && (
                    <h2>
                      {user?.dirty?.moneda.toLowerCase() === "dolar"
                        ? Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.dirty.plata)
                        : Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.dirty.plata)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.dirty &&
                    user?.totales?.dolar &&
                    user?.totales?.euro && (
                      <h2>
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(
                          ((user?.dirty?.plata *
                            user?.totales?.porcentajeFinal) /
                            100) *
                            (user?.dirty?.moneda.toLowerCase() === "dolar"
                              ? user?.totales?.dolar
                              : user?.totales?.euro)
                        )}
                      </h2>
                    )}
                </div>
              </section>
            )}
            {user?.islive && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="mx-auto m-1 flex justify-center items-center">
                    <img
                      src="/clubIsLive.png"
                      alt="logo Club Islive"
                      className="w-32 h-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.islive && <h2>{user?.islive?.codigo}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.islive && <h2>{user?.islive?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.islive && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.islive && (
                    <h2>
                      {Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.islive.euros)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.islive && user?.totales?.euro && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.islive?.euros *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.euro
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.mondo && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-black p-2 rounded-xl mx-auto m-1 h-10 w-32 flex justify-center items-center">
                    <img
                      src="/logo-mondocamgirls.svg"
                      alt="logo mondo cam girls"
                      className=" rounded-xl h-20"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.mondo && <h2>{user?.mondo?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.mondo && <h2>{user?.mondo?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.mondo && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.mondo && (
                    <h2>
                      {Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.mondo.euros)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.mondo && user?.totales?.euro && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.mondo?.euros * user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.euro
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.myFreeCams && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>

                  <div className="bg-white p-2 rounded-xl mx-auto m-1 h-10 w-32 flex justify-center items-center">
                    <img
                      src="/MyFreeCams_-_logo.svg"
                      alt="logo myFreecams"
                      className=" rounded-xl h-10"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.myFreeCams && <h2>{user?.myFreeCams?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.myFreeCams && <h2>{user?.myFreeCams?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.myFreeCams && (
                    <h2>
                      {Intl.NumberFormat("IN").format(user?.myFreeCams?.tokens)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.myFreeCams && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.myFreeCams.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.myFreeCams && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.myFreeCams?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.sakura && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-pink-950 p-2 rounded-xl mx-auto m-1 h-10 w-32 flex justify-center items-center">
                    <img
                      src="/Logo-SakuraLive.png"
                      alt="logo sakura"
                      className=" rounded-xl"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.sakura && <h2>{user?.sakura?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.sakura && <h2>{user?.sakura?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.sakura && (
                    <h2>
                      {Intl.NumberFormat("IN").format(user?.sakura?.tokens)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.sakura && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user.sakura.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.sakura && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.sakura?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.sender && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-black mx-auto m-1 rounded-xl h-10 w-32 flex justify-center items-center">
                    <img
                      src="/livestrip.webp"
                      alt="logo Sender"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.sender && <h2>{user?.sender?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.sender && <h2>{user?.sender?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.sender && (
                    <h2>
                      {Intl.NumberFormat("IN").format(
                        user?.senderAnterior?.coins
                          ? user?.sender?.coins - user?.senderAnterior?.coins
                          : user?.sender?.coins
                      )}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.sender && (
                    <h2>
                      {Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        user?.senderAnterior?.euros
                          ? user?.sender?.euros - user?.senderAnterior?.euros
                          : user?.sender?.euros
                      )}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.sender && user?.totales?.euro && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        (((user?.senderAnterior?.euros
                          ? user?.sender?.euros - user?.senderAnterior?.euros
                          : user?.sender?.euros) *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.euro
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.skype && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-white p-2 rounded-xl mx-auto m-1 h-10 w-32 flex justify-center items-center">
                    <img src="/Skype.webp" alt="logo Skype" />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.skype && <h2>{user?.skype?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.skype && <h2>{user?.skype?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.skype && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.skype && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.skype?.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.skype && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.skype?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.streamate && (
              <section
                className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
                onClick={handleShowDetailStreamate}
                style={{ cursor: "pointer" }}
              >
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-black mx-auto m-1 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                    <img
                      src="/92393-1569967393-Streamate_on_dark.png"
                      alt="logo Streamete"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.streamate && <h2>{user?.streamate[0]?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.streamate && <h2>{user?.streamate?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.streamate && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.streamateTotal && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.streamateTotal)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.streamateTotal && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.streamateTotal *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {showDetailStreamate && (
              <div className=" m-2 p-2 border-4 border-indigo-900 dark:border-black rounded-2xl bg-indigo-300 dark:bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">CORTES STREAMATE</h1>
                  <div>
                    {user?.streamate?.map((detalle, index) => (
                      <section
                        className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
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
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {user?.streamRay && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-sky-950 mx-auto m-1 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                    <img
                      src="/Streamray_250x50_2021.svg"
                      alt="logo Stream Ray"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.streamRay && <h2>{user?.streamRay?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.streamRay && <h2>{user?.streamRay?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.streamRay && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.streamRay && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.streamRay?.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.streamRay && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.streamRay?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.stripchat && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-white mx-auto m-1 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                    <img
                      src="/stripchat.png"
                      alt="logo Stripchat"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.stripchat && <h2>{user?.stripchat?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.stripchat && <h2>{user?.stripchat?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.stripchat && (
                    <h2>
                      {Intl.NumberFormat("IN").format(user?.stripchat?.tokens)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.stripchat && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.stripchat?.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.stripchat && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.stripchat?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.tripleSiete && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-red-950 mx-auto m-1 p-2 h-10 rounded-xl  w-32 flex justify-center items-center">
                    <img
                      src="/logo777.png"
                      alt="logo 777"
                      className="p-2 pt-4"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.tripleSiete && <h2>{user?.tripleSiete?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.tripleSiete && (
                    <h2>{user?.tripleSiete?.length || 1}</h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.tripleSiete && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.tripleSiete && (
                    <h2>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.tripleSiete?.dolares)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.tripleSiete && user?.totales?.dolar && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.tripleSiete?.dolares *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.dolar
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.vx && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-black  mx-auto m-1 rounded-xl h-10 w-32 flex justify-center items-center">
                    <img
                      src="/VxMaster.svg"
                      alt="logo Vx master"
                      className="w-32 h-10 p-1 rounded-2xl "
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.vx && <h2>{user?.vx?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.vx && <h2>{user?.vx?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.vx && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.vx && (
                    <h2>
                      {Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.vx?.euros)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.vx && user?.totales?.euro && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.vx?.euros * user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.euro
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.xlove && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-red-800 h-10 w-32 p-2 rounded-xl mx-auto m-1">
                    <img
                      src="/xlove.png"
                      alt="logo Xlove"
                      className="h-7 w-36"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.xlove && <h2>{user?.xlove?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.xlove && <h2>{user?.xlove?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.xlove && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.xlove && (
                    <h2>
                      {Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.xlove?.euros)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.xlove && user?.totales?.euro && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.xlove?.euros * user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.euro
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
            {user?.xlovenueva && (
              <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-4 border-indigo-700 dark:border-black p-1 my-1 hover:bg-emerald-400 dark:hover:bg-emerald-800">
                <div className="divPageUser">
                  <h1>pagina</h1>
                  <div className="bg-red-800 h-10 w-32 p-2 rounded-xl mx-auto m-1">
                    <img
                      src="/xlove.png"
                      alt="logo Xlove"
                      className="h-7 w-36"
                    />
                  </div>
                </div>
                <div className="divPageUser">
                  <h1>nombre</h1>
                  {user?.xlovenueva && <h2>{user?.xlovenueva?.userName}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>cortes</h1>
                  {user?.xlovenueva && <h2>{user?.xlovenueva?.length || 1}</h2>}
                </div>
                <div className="divPageUser">
                  <h1>tokens</h1>
                  {user?.xlovenueva && <h2>Sin tokens</h2>}
                </div>
                <div className="divPageUser">
                  <h1>creditos</h1>
                  {user?.xlovenueva && (
                    <h2>
                      {Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.xlovenueva?.euros)}
                    </h2>
                  )}
                </div>
                <div className="divPageUser">
                  <h1>pesos</h1>
                  {user?.xlovenueva && user?.totales?.euro && (
                    <h2>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(
                        ((user?.xlovenueva?.euros *
                          user?.totales?.porcentajeFinal) /
                          100) *
                          user?.totales?.euro
                      )}
                    </h2>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

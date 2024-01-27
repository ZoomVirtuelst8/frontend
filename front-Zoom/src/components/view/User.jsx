import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moneda from "../resource/Moneda.jsx";
import { useParams } from "react-router-dom";

import {
  getAllQuincena,
  searchUserByFortnight,
} from "../../redux/actions/registro/registerQuincena.js";
import { resetError } from "../../redux/actions/resetError.js";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const quincenas = useSelector((state) => state.quincenas);
  const user = useSelector((state) => state.quincenaUser);

  const [ids, setIds] = useState("");

  useEffect(() => {
    dispatch(resetError());
  }, [ids]);

  useEffect(() => {
    dispatch(getAllQuincena());
  }, [dispatch]);

  useEffect(() => {
    ids || ids !== "" ? dispatch(searchUserByFortnight(ids, id)) : "";
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

          <table className="min-w-full divide-y-4 bg-indigo-400 divide-indigo-700 border-4 border-indigo-700">
            <tbody className=" divide-y-2 divide-indigo-700">
              <tr className="text-center bd-indigo-600 font-bold ">
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  Nombre
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  meta
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total creditos
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  porcentaje
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  rojo
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  interes
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total prestamos
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total vitrina
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  total pesos
                </td>
                <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                  saldo
                </td>
              </tr>
              <tr className="bg-indigo-300">
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.porcentaje && <h1>{user.porcentaje?.nombre}</h1>}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.porcentaje && <h1>{user.porcentaje?.meta}</h1>}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalCreditos)}
                    </h1>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && <h1>{user?.totales?.porcentajeFinal} %</h1>}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }).format(user?.totales?.rojo)}
                    </h1>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }).format(user?.totales?.interes)}
                    </h1>
                  )}
                </td>
                <td
                  className="px-6 py-2 whitespace-nowrap hover:bg-green-300"
                  onClick={handleShowDetailPrestamos}
                  style={{ cursor: "pointer" }}
                >
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalPrestamos)}{" "}
                    </h1>
                  )}
                </td>
                <td
                  className="px-6 py-2 whitespace-nowrap hover:bg-green-300"
                  onClick={handleShowDetailVitrina}
                  style={{ cursor: "pointer" }}
                >
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalVitrina)}
                    </h1>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.totalPesos)}
                    </h1>
                  )}
                </td>
                <td
                  className={
                    user?.totales?.saldo > 0
                      ? "saldoPositivo px-6 py-2 whitespace-nowrap"
                      : "saldoRojo px-6 py-2 whitespace-nowrap"
                  }
                >
                  {user?.totales && (
                    <h1>
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(user?.totales?.saldo)}
                    </h1>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="my-2">
            <table className="min-w-full divide-y-4 bg-indigo-500 divide-indigo-700 border-4 border-indigo-700">
              <tbody className=" divide-y-2 divide-indigo-700">
                <tr className="text-center font-bold ">
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    pagina
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    nombre
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    cortes
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    tokens
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    creditos
                  </td>
                  <td className="px-6 py-3 text-lg  uppercase tracking-wider">
                    pesos
                  </td>
                </tr>
                {/*//todo adultwork */}
                {user?.adultwork && (
                  <tr
                    className="bg-indigo-400 hover:bg-green-300"
                    onClick={handleShowDetail}
                    style={{ cursor: "pointer" }}
                  >
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <img
                        src="/AWLogo_on.png"
                        alt="logo adultwork"
                        className="w-32 h-10"
                      />
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && (
                        <h1>{user?.adultwork[0]?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && (
                        <h1>{user?.adultwork?.length || 1}</h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && <h1>Sin tokens</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.adultwork && (
                        <h1>
                          {Intl.NumberFormat("en-GB", {
                            style: "currency",
                            currency: "GBP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.adultworkTotal)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.adultwork && user?.totales?.libra && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/*//todo amateur */}
                {user?.amateur && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-red-600 rounded-xl p-2 h-10 w-32 flex justify-center items-center">
                        <img src="/Amateur.png" alt="logo Amateur" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && <h1>{user?.amateur?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && <h1>{user?.amateur?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.amateur?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.amateur && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.amateur.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.amateur && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/*//todo BONGA */}
                {user?.bonga && (
                  <tr
                    className="bg-indigo-400 hover:bg-green-300"
                    onClick={handleShowDetailBonga}
                    style={{ cursor: "pointer" }}
                  >
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <img
                        src="/bonga.jpeg"
                        alt="logo bonga"
                        className="w-32 h-10 rounded-xl"
                      />
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && <h1>{user?.bonga[0]?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && <h1>{user?.bonga?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.bonga && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.bongaTotal)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.bonga && user?.totales?.dolar && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.bongaTotal *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.dolar
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/*//todo CAM4 */}
                {user.cam4 && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black rounded-xl h-10 p-2 w-32 flex justify-center items-center">
                        <img src="/Cam4.png" alt="logo Cam4" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && <h1>{user?.cam4?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && <h1>{user?.cam4?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.cam4 && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.cam4.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.cam4 && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo CHATURBATE */}
                {user?.chaturbate && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className=" bg-slate-200 p-2 h-10 w-32 rounded-xl flex justify-center items-center ">
                        <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>{user?.chaturbate?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>{user?.chaturbate?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.chaturbate?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.chaturbate && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.chaturbate?.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.chaturbate && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo DIRTY */}
                {user?.dirty && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-stone-900 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img src="/mydirty.png" alt="logo Dirty" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && <h1>{user?.dirty?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && <h1>{user?.dirty?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.dirty && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.dirty &&
                        user?.totales?.dolar &&
                        user?.totales?.euro && (
                          <h1>
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
                          </h1>
                        )}
                    </td>
                  </tr>
                )}
                {/* //todo ISLIVE */}
                {user?.islive && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <img
                        src="/clubIsLive.png"
                        alt="logo Club Islive"
                        className="w-32 h-10 rounded-xl"
                      />
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && <h1>{user?.islive?.codigo}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && <h1>{user?.islive?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.islive && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.islive.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.islive && user?.totales?.euro && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo MONDO */}
                {user?.mondo && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/logo-mondocamgirls.svg"
                          alt="logo mondo cam girls"
                          className=" rounded-xl h-20"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && <h1>{user?.mondo?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && <h1>{user?.mondo?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.mondo && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.mondo.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.mondo && user?.totales?.euro && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.mondo?.euros *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.euro
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo MYFREECAMS */}
                {user?.myFreeCams && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-white p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/MyFreeCams_-_logo.svg"
                          alt="logo myFreecams"
                          className=" rounded-xl h-10"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.myFreeCams && (
                        <h1>{user?.myFreeCams?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.myFreeCams && (
                        <h1>{user?.myFreeCams?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.myFreeCams && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.myFreeCams?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.myFreeCams && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.myFreeCams.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.myFreeCams && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo SAKURA */}
                {user?.sakura && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-pink-950 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/Logo-SakuraLive.png"
                          alt="logo sakura"
                          className=" rounded-xl"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sakura && <h1>{user?.sakura?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sakura && <h1>{user?.sakura?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sakura && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.sakura?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sakura && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user.sakura.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.sakura && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo SENDER */}
                {user?.sender && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/livestrip.webp"
                          alt="logo Sender"
                          className="h-10"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sender && <h1>{user?.sender?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sender && <h1>{user?.sender?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sender && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.senderAnterior?.coins
                              ? user?.sender?.coins -
                                  user?.senderAnterior?.coins
                              : user?.sender?.coins
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.sender && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            user?.senderAnterior?.euros
                              ? user?.sender?.euros -
                                  user?.senderAnterior?.euros
                              : user?.sender?.euros
                          )}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.sender && user?.totales?.euro && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            (((user?.senderAnterior?.euros
                              ? user?.sender?.euros -
                                user?.senderAnterior?.euros
                              : user?.sender?.euros) *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.euro
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo SKYPE */}
                {user?.skype && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-white p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img src="/Skype.webp" alt="logo Skype" />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.skype && <h1>{user?.skype?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.skype && <h1>{user?.skype?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.skype && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.skype && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.skype?.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.skype && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo STREAMATE */}
                {user?.streamate && (
                  <tr
                    className="bg-indigo-400 hover:bg-green-300 "
                    onClick={handleShowDetailStreamate}
                    style={{ cursor: "pointer" }}
                  >
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black  p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/92393-1569967393-Streamate_on_dark.png"
                          alt="logo Streamete"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamate && (
                        <h1>{user?.streamate[0]?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamate && (
                        <h1>{user?.streamate?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamate && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamateTotal && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.streamateTotal)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.streamateTotal && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo STREAMRAY */}
                {user?.streamRay && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-sky-950 p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/Streamray_250x50_2021.svg"
                          alt="logo Stream Ray"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamRay && <h1>{user?.streamRay?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamRay && (
                        <h1>{user?.streamRay?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamRay && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.streamRay && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.streamRay?.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.streamRay && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo STRIPCHAT */}
                {user?.stripchat && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-white  p-2 rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/stripchat.png"
                          alt="logo Stripchat"
                          className="h-10"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.stripchat && <h1>{user?.stripchat?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.stripchat && (
                        <h1>{user?.stripchat?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.stripchat && (
                        <h1>
                          {Intl.NumberFormat("es-IN").format(
                            user?.stripchat?.tokens
                          )}
                        </h1>
                      )}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.stripchat && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.stripchat?.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.stripchat && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo TRIPLESIETE */}
                {user?.tripleSiete && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-red-950 p-2 h-10 rounded-xl  w-32 flex justify-center items-center">
                        <img
                          src="/logo777.png"
                          alt="logo 777"
                          className="p-2 pt-4"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.tripleSiete && (
                        <h1>{user?.tripleSiete?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.tripleSiete && (
                        <h1>{user?.tripleSiete?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.tripleSiete && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.tripleSiete && (
                        <h1>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.tripleSiete?.dolares)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.tripleSiete && user?.totales?.dolar && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo VX */}
                {user?.vx && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-black   rounded-xl h-10 w-32 flex justify-center items-center">
                        <img
                          src="/VxMaster.svg"
                          alt="logo Vx master"
                          className="w-32 h-10 p-1 rounded-2xl "
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.vx && <h1>{user?.vx?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.vx && <h1>{user?.vx?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.vx && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.vx && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.vx?.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.vx && user?.totales?.euro && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.vx?.euros *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.euro
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo XLOVE */}
                {user?.xlove && (
                  <tr className="bg-indigo-300 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-red-800 h-10 w-32 p-2 rounded-xl">
                        <img
                          src="/xlove.png"
                          alt="logo Xlove"
                          className="h-7 w-36"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlove && <h1>{user?.xlove?.userName}</h1>}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlove && <h1>{user?.xlove?.length || 1}</h1>}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlove && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlove && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.xlove?.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.xlove && user?.totales?.euro && (
                        <h1>
                          {Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            ((user?.xlove?.euros *
                              user?.totales?.porcentajeFinal) /
                              100) *
                              user?.totales?.euro
                          )}
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
                {/* //todo XLOVENUEVA */}
                {user?.xlovenueva && (
                  <tr className="bg-indigo-400 hover:bg-green-300">
                    {/* logo */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="bg-red-800 h-10 w-32 p-2 rounded-xl">
                        <img
                          src="/xlove.png"
                          alt="logo Xlove"
                          className="h-7 w-36"
                        />
                      </div>
                    </td>
                    {/* userName */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlovenueva && (
                        <h1>{user?.xlovenueva?.userName}</h1>
                      )}
                    </td>
                    {/* cortes */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlovenueva && (
                        <h1>{user?.xlovenueva?.length || 1}</h1>
                      )}
                    </td>
                    {/* tokens */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlovenueva && <h1>Sin tokens</h1>}
                    </td>
                    {/* creditos */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user?.xlovenueva && (
                        <h1>
                          {Intl.NumberFormat("en-EU", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(user?.xlovenueva?.euros)}
                        </h1>
                      )}
                    </td>
                    {/* total pesos */}
                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      {user?.xlovenueva && user?.totales?.euro && (
                        <h1>
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
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* //todo CORTES ADULTWORK */}
            {showDetail && (
              <div className="min-w-fit max-h-96 overflow-y-scroll m-2 p-2 border-4 border-indigo-900 rounded-2xl right-40 fixed bottom-2 bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">CORTES ADULTWORK</h1>
                  <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          UserName
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Libras
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Tipo
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Fecha Adultwork
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                      {user?.adultwork?.map((detalle, index) => (
                        <tr key={detalle?.id} className="hover:bg-green-300">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {detalle?.userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold">
                            {Intl.NumberFormat("en-GB", {
                              style: "currency",
                              currency: "GBP",
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            }).format(detalle?.creditos)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold">
                            {detalle?.parcial ? "Parcial" : "Regular"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {detalle?.parcial
                              ? detalle?.createdAt
                              : detalle?.fecha}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* //todo CORTES BONGA */}
            {showDetailBonga && (
              <div className="min-w-fit max-h-96 overflow-y-scroll m-2 p-2 border-4 border-indigo-900 rounded-2xl right-40 fixed bottom-2 bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">CORTES BONGA</h1>
                  <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          UserName
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          dolares
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                      {user?.bonga?.map((detalle, index) => (
                        <tr key={detalle?.id} className="hover:bg-green-300">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {detalle?.userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold">
                            {Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(detalle?.dolares)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {detalle?.fecha}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* //todo CORTES STREAMATE */}
            {showDetailStreamate && (
              <div className="min-w-fit max-h-96 overflow-y-scroll m-2 p-2 border-4 border-indigo-900 rounded-2xl right-40 fixed bottom-2 bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">CORTES STREAMATE</h1>
                  <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          UserName
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          dolares
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                      {user?.streamate?.map((detalle, index) => (
                        <tr key={detalle?.id} className="hover:bg-green-300">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {detalle?.userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold">
                            {Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(detalle?.dolares)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {detalle?.fecha}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* //todo CORTES PRESTAMOS */}
            {showDetailPrestamos && user?.prestamos?.length > 0 && (
              <div className="min-w-fit max-h-96 overflow-y-scroll m-2 p-2 border-4 border-indigo-900 rounded-2xl right-40 fixed bottom-2 bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">PRESTAMOS</h1>
                  <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          cantidad
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                      {user?.prestamos?.map((detalle, index) => {
                        const fecha = new Date(detalle?.createdAt);

                        const dia = fecha.getDate();
                        const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
                        const ano = fecha.getFullYear();

                        const fechaFormateada = `${dia}/${mes}/${ano}`;
                        return (
                          <tr key={detalle?.id} className="hover:bg-green-300">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold">
                              {Intl.NumberFormat("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(detalle?.cantidad)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {fechaFormateada}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* //todo CORTES VITRINA */}
            {showDetailVitrina && user?.ventas?.length > 0 && (
              <div className="min-w-fit max-h-96 overflow-y-scroll m-2 p-2 border-4 border-indigo-900 rounded-2xl right-40 fixed bottom-2 bg-slate-600">
                <div className="overflow-x-auto px-2 py-2">
                  <h1 className="text-xl font-bold m-2">VITRINA</h1>
                  <table className="min-w-full divide-y-4 divide-indigo-700 border-4 border-indigo-700">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          nombre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          cantidad
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          valor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                        >
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-indigo-400 divide-y-2 divide-indigo-700">
                      {user?.ventas?.map((detalle, index) => {
                        const fecha = new Date(detalle?.createdAt);

                        const dia = fecha.getDate();
                        const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
                        const ano = fecha.getFullYear();

                        const fechaFormateada = `${dia}/${mes}/${ano}`;
                        return (
                          <tr key={detalle?.id} className="hover:bg-green-300">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {detalle?.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold">
                              {detalle?.cantidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {Intl.NumberFormat("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(detalle?.valor)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {fechaFormateada}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

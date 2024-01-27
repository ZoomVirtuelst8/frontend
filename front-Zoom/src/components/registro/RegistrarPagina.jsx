import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postPagina,
  getAllPagina,
} from "../../redux/actions/registro/registerPaginas.js";

const valida = (pagina, paginas) => {
  let error = "";
  if (pagina.length < 2 || pagina.length === 0) {
    error = "El nombre de la pagina es obligatorio";
  }
  if (
    paginas &&
    paginas.some((p) => p.nombrePagina.toLowerCase() === pagina.toLowerCase())
  ) {
    error = "El nombre de la página ya existe";
  }
  return error;
};
const RegistrarPagina = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pagina, setPagina] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [confirmacion, setConfirmacion] = useState("");
  const paginas = useSelector((state) => state.paginas);

  useEffect(() => {
    dispatch(getAllPagina());
  }, [dispatch]);


  const handlePagina = (event) => {
    const paginaValue = event.target.value;
    const errorText = valida(paginaValue, paginas);
    setPagina(paginaValue);
    setError(errorText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = valida(pagina);
    if (errores.length === 0) {
      dispatch(postPagina(pagina));
      setPagina("");
      setShowForm(false);
      setConfirmacion("se envio la solicitud.");
      setConfirmacion("");
      navigate("/crear");
      setError(errores);
    }
  };

  return (
    <div className="contenedor1">
      {confirmacion && (
        <div>
          <h1>{confirmacion}</h1>
        </div>
      )}
      {showForm && (
        <div className="contenedor2">
          <div className="divTitulo">
          <h1 className="titulo">Registro De Paginas</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col"
          >
            <section className="form">

            <section className=" w-96 m-5">
              <label className="subTitulo">Nombre De La Pagina</label>
              <input
                type="text"
                className="input"
                value={pagina}
                onChange={handlePagina}
                name="pagina"
                placeholder="Escriba el nombre de la pagina"
              />
            </section>
            {error && (
              <div className="text-center text-red-500 font-bold">{error}</div>
            )}
            <section className="flex m-5 items-center justify-center">
              <button type="submit" className="btn-w w-auto font-bold text-4xl">
                <BiSend />
              </button>
            </section>
      </section>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrarPagina;

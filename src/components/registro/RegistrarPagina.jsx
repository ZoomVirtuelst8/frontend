import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postPagina,
  getAllPagina,
} from "../../redux/actions/registro/registerPaginas.js";
import { resetError } from "../../redux/actions/resetError.js";

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
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const paginas = useSelector((state) => state.paginas);
  const token = useSelector((state) => state.token);
  const perror = useSelector((state) => state.Error);

  useEffect(() => {
    dispatch(getAllPagina(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetError());
  }, [pagina]);

  const handlePagina = (event) => {
    const paginaValue = event.target.value;
    const errorText = valida(paginaValue, paginas);
    setPagina(paginaValue);
    setError(errorText);
  };
  console.log(perror);
  const handleSubmit = (e) => {
    e.preventDefault();

    const errores = valida(pagina, paginas);
    if (errores.length === 0) {
      dispatch(postPagina(pagina, token));
      setShowConfirmacion(true);
      setConfirmacion(
        "Espere un momento creando pagina nueva... Navega automaticamente despues de creada la pagina"
      );
      // setConfirmacion('Pagina creada correctamente.')
      setTimeout(() => {
        navigate("/crear");
      }, 3000);
    }
    if (perror) {
      setShowForm(true);
      setShowConfirmacion(false);
      setConfirmacion("");
    }
  };
  console.log(showConfirmacion);
  return (
    <div className="contenedor">
      {showConfirmacion && (
        <div className="flex">
          <h1 className=" text-justify">{confirmacion}</h1>
        </div>
      )}
      {showForm && (
        <div>
          <div className="divTitulo">
            <h1 className="titulo">Registro De Paginas</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <section className="sectionform">
              <section>
                <div className="divlabel">
                  <label className="label">Nombre De La Pagina</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input"
                    value={pagina}
                    onChange={handlePagina}
                    name="pagina"
                    placeholder="Escriba el nombre de la pagina"
                  />
                </div>
              </section>
              {error && <div className="error">{error}</div>}
              {perror && <div className="error">{perror.error}</div>}
              <section className="sectionbtns">
                <button type="submit" className="btns">
                  <BiSend className="BiSend" />
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

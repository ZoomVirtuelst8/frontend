import React, { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPagina } from "../../redux/actions/registro/registerPaginas.js";
import { getAllUser } from "../../redux/actions/registro/registerUser.js";
import { getAllUbicacion } from "../../redux/actions/registro/RegisterUbicacion.js";
import { getAllPorcentaje } from "../../redux/actions/registro/registerPorcentaje.js";
import { postUserName } from "../../redux/actions/registro/registerUserName.js";
import { resetError } from "../../redux/actions/resetError.js";
import { useNavigate } from "react-router-dom";

const RegistroUserName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paginas = useSelector((state) => state.paginas);
  const allUser = useSelector((state) => state.allUser);
  const token = useSelector((state) => state.token);
  const perror = useSelector((state) => state.Error);

  const [input, setInput] = useState({
    paginas: [],
    user: "",
  });

  const [show, setShow] = useState({});

  useEffect(() => {
    dispatch(getAllPagina(token));
    dispatch(getAllUser(token));
    dispatch(getAllPorcentaje(token));
    dispatch(getAllUbicacion(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetError());
  }, [input]);

  const handlePaginas = (idPagina) => {
    const paginaSeleccionada = paginas.find((pagina) => pagina.id === idPagina);
    if (paginaSeleccionada) {
      setInput({
        ...input,
        paginas: [...input.paginas, idPagina],
      });
      setShow({
        ...show,
        [idPagina]: true,
      });
    }
  };

  const handleDelete = (idPaginaToDelete) => {
    const updatedInput = { ...input };

    updatedInput.paginas = updatedInput.paginas.filter(
      (idPagina) => idPagina !== idPaginaToDelete
    );
    delete updatedInput[idPaginaToDelete];
    setInput(updatedInput);
    setShow({
      ...show,
      [idPaginaToDelete]: false,
    });
  };
  const handleUser = (event) => {
    setInput({
      ...input,
      user: event.target.value,
    });
  };

  const renderCamposUsuario = (idPagina) => {
    const pagina = paginas.find((p) => p.id === idPagina);

    if (pagina) {
      return (
        <section>
          <div className="divlabel">
            <label className="label">Nick De {pagina.nombrePagina}</label>
          </div>
          <div className="divinput">
            {" "}
            <input
              type="text"
              placeholder={`Usuario de ${pagina.nombrePagina}`}
              value={input[idPagina] || ""}
              onChange={(e) =>
                setInput({
                  ...input,
                  [idPagina]: e.target.value,
                })
              }
              className="input"
            />
          </div>
        </section>
      );
    }

    return null;
  };

  
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input.paginas.length !== 0 && input.user.length !== 0) {
      const userNames = input.paginas.map((idPagina) => ({
        user: input.user,
        pagina: idPagina,
        userName: input[idPagina] || "", // Usamos el nombre de usuario si está definido
      }));
      dispatch(postUserName(userNames, token));
      navigate("/crear");
    }
  };
  return (
    <div className="contenedor">
      <div>
        <form onSubmit={handlerSubmit}>
          <div className="divTitulo">
            <h1 className="titulo">Registro De UserNames</h1>
          </div>
          <section className="sectionform">
            <section className="divinput">
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
            <section className="">
              <label className="label">Paginas:</label>
              <p className="text-justify">
                Seleccione una página para introducir el nombre de usuario
              </p>
              <section className="flex items-center justify-center">
                <select
                  onChange={(e) => handlePaginas(e.target.value)}
                  className="select"
                >
                  <option value="">Seleccione Páginas</option>
                  {paginas.map((pagina) => {
                    if (
                      !input.paginas.includes(pagina.id) &&
                      !allUser
                        ?.find((x) => x.id === input.user)
                        ?.useres?.find((y) => y.pagina === pagina.id)
                    ) {
                      return (
                        <option
                          value={pagina.id}
                          name="pagina"
                          key={pagina.id}
                          className="font-bold"
                        >
                          {pagina.nombrePagina}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
              </section>
            </section>
            <section>
              <h1 className="font-bold text-2xl sm:text-xl">
                Lista De Páginas
              </h1>
              <ol>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                  {input.paginas.map((idPagina) => {
                    const pagina = paginas.find((p) => p.id === idPagina);
                    if (pagina) {
                      return (
                        <li key={idPagina} className="m-2 min-w-max">
                          <div className="bg-indigo-200 dark:bg-slate-600 m-2 px-2 rounded-xl flex justify-between">
                            <p className="mx-2">{pagina.nombrePagina}</p>
                            <button
                              onClick={() => {
                                handleDelete(idPagina);
                              }}
                              className="btn-n"
                            >
                              <FcCancel /> {/* Eliminar */}
                            </button>
                          </div>
                        </li>
                      );
                    }
                    return null;
                  })}
                </div>
              </ol>
            </section>
          </section>
          {/* Resto de tu formulario */}
          <h1 className=" font-bold text-3xl sm:text-2xl text-center">
            Nombres De Usuario
          </h1>
          <section className="sectionform">
            <section className="grid grid-cols-1">
              {input.paginas.map((idPagina) => (
                <React.Fragment key={idPagina}>
                  {renderCamposUsuario(idPagina)}
                </React.Fragment>
              ))}
            </section>
          </section>
          <section className="sectionbtns">
            <button className="btns" type="submit">
              <BiSend className="BiSend" />
            </button>
          </section>
          {perror && (
            <div className="error">
              <h1>{perror.Error}</h1>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistroUserName;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBI } from "../../redux/actions/registro/registerUser.js";
import { getAllPagina } from "../../redux/actions/registro/registerPaginas.js";
import { useParams, Link } from "react-router-dom";
import { AiOutlineContainer } from "react-icons/ai";
import { TiCogOutline } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteUserName } from "../../redux/actions/registro/registerUserName.js";

const DetailUser = () => {
  const dispatch = useDispatch();
  const userBI = useSelector((state) => state.userB);
  const error = useSelector((state) => state.error);
  const paginas = useSelector((state) => state.paginas);
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.Id);

  useEffect(() => {
    if (id) {
    dispatch(getUserBI(id, token));
    dispatch(getAllPagina(token));
    }
  }, [id, dispatch]);

  const fecha = new Date(userBI?.createdAt);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
  const ano = fecha.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${ano}`;

  const handleDelete = (id) => {
    dispatch(deleteUserName(id, token));
  };

  return (
    <div className="contenedor">
      <div className="">
        {/* <section className="absolute ml-2 left-0  font-bold">
          <Link to={`/modelo/comment/${userBI.id}`}>
            <p>comentario</p>
            <div className="flex items-center justify-center">
              <AiOutlineContainer className=" text-5xl btn-n" />
            </div>
          </Link>
        </section> */}

        <section className="m-1 justify-center">
          <div className="divDetail">
            Nombre:
            <p className=" detalle">{userBI?.nombre}</p>
          </div>
          <div className="divDetail">
            Apellido:
            <p className="detalle">{userBI?.apellido}</p>
          </div>
          <div className="divDetail">
            userName:
            <p className="detalle">{userBI?.session}</p>
          </div>
          <div className="divDetail">
            Nacionalidad:
            <p className="detalle">{userBI?.nacionalidad}</p>
          </div>
          <div className="divDetail">
            Cedula:
            <p className="detalle">{userBI?.cedula}</p>
          </div>

          <div className="divDetail">
            Telefono:
            <p className="detalle">{userBI?.telefono}</p>
          </div>
          <div className="divDetail">
            WhatsApp:
            <p className="detalle">{userBI?.whatsapp}</p>
          </div>
          <div className="divDetail">
            Fecha De Nacmiento:
            <p className="detalle">{userBI?.fechaDeNacimiento}</p>
          </div>
          <div className="divDetail">
            Fecha De Registro:
            <p className="detalle">{fechaFormateada}</p>
          </div>
          <div className="divDetail">
            Sitio De Trabajo:
            <p className="detalle">{userBI?.p_ubicacion?.ubicacion}</p>
          </div>
          <div className="divDetail">
            Porcentaje:
            <p className="detalle">{userBI?.p_porcentaje?.nombre}</p>
          </div>
          <div className="divDetail">
            Direccion:
            <p className="detalle">{userBI?.direccion}</p>
          </div>
          <div className="divDetail">
            Administrador:
            <p className="detalle">
              {userBI?.admin ? "Es un administrador" : "No es Administrador"}
            </p>
          </div>
          </section>

          <section>
          <div>
            {userBI.useres?.map((x) => {
              return (
                <div key={x.id}>
                  <div className="divDetail">
                    {paginas.map((pagina) => {
                      if (pagina.id === x.pagina) {
                        return (
                          <div key={pagina.id}>{pagina.nombrePagina}:</div>
                        );
                      }
                      return null;
                    })}
                    <div className="flex items-center ">
                      <Link to={`/editar/username/${x.id}`}>
                        <p className=" text-left mx-5 detalles">{x.userName}</p>
                      </Link>
                      <button
                        className="btns w-10"
                        onClick={() => handleDelete(x.id)}
                      >
                        <RiDeleteBin6Line className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {userBI.comments?.map((x) => {
              return (
                <div key={x.id}>
                  <div className="divDetail ">
                    Cometario creado: {x.createdAt}:
                    <p className=" text-left mx-5 detalles">{x.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailUser;

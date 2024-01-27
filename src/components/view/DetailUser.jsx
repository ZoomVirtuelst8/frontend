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
  const { id } = useParams();
  const dispatch = useDispatch();
  const userBI = useSelector((state) => state.userB);
  const error = useSelector((state) => state.error);
  const paginas = useSelector((state) => state.paginas);

  useEffect(() => {
    dispatch(getUserBI(id));
    dispatch(getAllPagina());
  }, [dispatch]);

  const fecha = new Date(userBI?.createdAt);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
  const ano = fecha.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${ano}`;

  const handleDelete = (id) => {
    dispatch(deleteUserName(id));
  };

  return (
    <div className="contenedor1 pt-7 px-10">
      <div className="flex grid-cols-2 justify-between text-center items-center">
        <section className="absolute ml-2 left-0 top-20 font-bold">
          <Link to={`/modelo/comment/${userBI.id}`}>
            <p>comentario</p>
            <div className="flex items-center justify-center">
              <AiOutlineContainer className=" text-5xl btn-n" />
            </div>
          </Link>
        </section>

        <section className="absolute ml-2 m-1 right-0 top-12 font-bold">
          <div className="flex items-center justify-center">
            <Link to="/editar">
              <TiCogOutline className=" text-5xl btn-n" />
            </Link>
          </div>
        </section>

        <div key={userBI?.id} className="m-2">
          <img src={userBI?.image} alt="imagen" className="img-d" />
        </div>
        <section className="m-5 text-right">
          <div className="divDetail">
            Nombre:
            <p className=" detalles">{userBI?.nombre}</p>
          </div>
          <div className="divDetail">
            Apellido:
            <p className="detalles">{userBI?.apellido}</p>
          </div>
          <div className="divDetail">
            Administrador:
            <p className="detalles">
              {userBI?.admin ? "Es un administrador" : "No esta Administrador"}
            </p>
          </div>
          <div className="divDetail">
            Correo:
            <p className="detalles">{userBI?.correo}</p>
          </div>
          <div className="divDetail">
            Cedula:
            <p className="detalles">{userBI?.cedula}</p>
          </div>
          <div className="divDetail">
            Direccion:
            <p className="detalles">{userBI?.direccion}</p>
          </div>
          <div className="divDetail">
            Fecha De Nacmiento:
            <p className="detalles">{userBI?.fechaDeNacimiento}</p>
          </div>
          <div className="divDetail">
            Nacionalidad:
            <p className="detalles">{userBI?.nacionalidad}</p>
          </div>
          <div className="divDetail">
            Telefono:
            <p className="detalles">{userBI?.telefono}</p>
          </div>
          <div className="divDetail">
            WhatsApp:
            <p className="detalles">{userBI?.whatsapp}</p>
          </div>
          <div className="divDetail">
            Fecha De Registro:
            <p className="detalles">{fechaFormateada}</p>
          </div>
          <div className="divDetail">
            Sitio De Trabajo:
            <p className="detalles">{userBI?.p_ubicacion?.ubicacion}</p>
          </div>
          <div className="divDetail">
            Porcentaje:
            <p className="detalles">{userBI?.p_porcentaje?.nombre}</p>
          </div>
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
                        className="btn-n w-10"
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

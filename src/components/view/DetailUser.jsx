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

if (userBI?.useres?.length > 0) {
  userBI.userName = [];
  for (const user of userBI?.useres) {
    for (const pagina of paginas) {
      if (pagina?.id === user?.pagina) {
        userBI?.userName.push({
          pagina: pagina?.nombrePagina,
          userName: user?.userName,
        });
      }
    }
  }
  userBI?.userName?.sort((a, b) => a?.pagina?.localeCompare(b?.pagina));
}

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
      <section className="fixed top-16 left-5  font-bold btns sm:text-xs md:text-md lg:text-base">
        <Link to={`/modelo/comment/${userBI.id}`}>
          <p>comentario</p>
          <div className="flex items-center justify-center">
            <AiOutlineContainer className=" lg:text-5xl sm:text-xl " />
          </div>
        </Link>
      </section>

      <div className="divTitulo">
        <h1 className="title">Detalles de la modelo</h1>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1">
        <div className="">
          <h1 className="uppercase text-2xl text-center font-bold">
            modelo
          </h1>
          <section className="m-4">
          <div className="divDetail">
            <h1 className="detalle1">Nombre:</h1>
            <p className="detalle">{userBI?.nombre}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Apellido:</h1>
            <p className="detalle">{userBI?.apellido}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">userName:</h1>
            <p className="detalle">{userBI?.session}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Nacionalidad:</h1>
            <p className="detalle">{userBI?.nacionalidad}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Cedula:</h1>
            <p className="detalle">{userBI?.cedula}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Telefono:</h1>
            <p className="detalle">{userBI?.telefono}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">WhatsApp:</h1>
            <p className="detalle">{userBI?.whatsapp}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Fecha De Nacmiento:</h1>
            <p className="detalle">{userBI?.fechaDeNacimiento}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Fecha De Registro:</h1>
            <p className="detalle">{fechaFormateada}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Sitio De Trabajo:</h1>
            <p className="detalle">{userBI?.p_ubicacion?.ubicacion}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Porcentaje:</h1>
            <p className="detalle">{userBI?.p_porcentaje?.nombre}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Direccion:</h1>
            <p className="detalle">{userBI?.direccion}</p>
          </div>
          <div className="divDetail">
            <h1 className="detalle1">Admind:</h1>
            <p className="detalle">{userBI?.admin ? "SI" : "NO"}</p>
          </div>
        </section>
        </div>
        

        <div>
        <h1 className="uppercase text-2xl text-center font-bold">
            pagina y userName
          </h1>
          <section className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userBI.userName?.map((x, index) => {
              return (
                <div key={index + 1}>
                  <div className="grid sm:grid-cols-1 md:grid-cols-1 bg-indigo-300 dark:bg-slate-700 m-1">
                    <h1 className="sm:text-center">{x.pagina}</h1>
                    <Link to={`/editar/username/${x.id}`}>
                      <p className="sm:text-center">{x.userName}</p>
                    </Link>
                    <button className="btns" onClick={() => handleDelete(x.id)}>
                      <RiDeleteBin6Line className="text-2xl mx-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
        <div>
        <h1 className="uppercase text-2xl text-center font-bold">
            comentarios
          </h1>
          <section className="m-4">
          {userBI.comments?.map((x) => {
            const fecha = new Date(x?.createdAt);

            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
            const ano = fecha.getFullYear().toString().slice(2);
            const fechaFormateada = `${dia}/${mes}/${ano}`;
            return (
              <div key={x.id}>
                <div className="divDetail ">
                  <h1 className="text-center font-bold ">{fechaFormateada}:</h1>
                  
                  <p className=" text-justify mx-5 detalles">{x.comment}</p>
                </div>
              </div>
            );
          })}
        </section>
        </div>
        
      </div>
    </div>
  );
};

export default DetailUser;

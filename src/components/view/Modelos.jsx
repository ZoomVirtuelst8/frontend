import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
} from "../../redux/actions/registro/registerUser.js";
import { Link, useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { saveID } from "../../redux/actions/id.js";

const Modelos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const actual = jwtDecode(token);
  const user = useSelector((state) => state.allUser);
  useEffect(() => {
    dispatch(getAllUser(token));
  }, [dispatch]);

  const handleEditUser = (id) => {
    navigate(`/editar/user/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id, token));
    navigate("/home");
  };
  return (
    <div className="contenedor">
      <div className="contenedor2">
        <div className="divTitulo">
          <h1 className="title">Lista De Modelos</h1>
        </div>
        <section className="bg-indigo-100 dark:bg-slate-950 rounded-2xl p-2 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 justify-between">
          {user?.map((user) => {
            if (actual.id === user.id) {
              return null;
            }
            return (
              <div
                className="flex bg-indigo-300 dark:bg-black font-bold text-xl rounded-2xl m-2 px-2"
                key={user.id}
              >
                <Link
                  to={`/modelo/${user.session}`}
                  onClick={() => dispatch(saveID(user.id))}
                  key={user.id}
                >
                  <div
                    key={user.id}
                    className=" m-2 max-w-sm text-left p-2 flex items-center"
                  >
                    <p>
                      {user && user?.nombre?.split(" ")[0]}{" "}
                      {user && user?.apellido?.split(" ")[0]}
                    </p>
                    {/* <img src={user.image} alt="imagen" className="img-u" /> */}
                  </div>
                </Link>
                <section className="flex flex-col items-center my-auto">
                  <button
                    className="btn-n"
                    onClick={() => handleEditUser(user?.id)}
                  >
                    <GrEdit className="text-2xl" />
                  </button>
                  <button
                    className="btn-n "
                    onClick={() => handleDelete(user.id)}
                  >
                    <RiDeleteBin6Line className="text-2xl" />
                  </button>
                </section>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Modelos;

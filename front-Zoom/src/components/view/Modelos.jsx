import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
} from "../../redux/actions/registro/registerUser.js";
import { Link, useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const Modelos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUser);
  const actual = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleEditUser = (id) => {
    navigate(`/editar/user/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    navigate("/home");
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <section className="bg-indigo-100 p-2 flex sm:grid-cols-1 md:grid-cols-3  justify-between">
          {user?.map((user) => {
            if (actual.id === user.id) {
              return null;
            }
            return (
              <div className="flex" key={user.id}>
                <Link to={`/modelo/${user.id}`} key={user.id}>
                  <div
                    key={user.id}
                    className="bg-indigo-300 rounded-2xl m-2 max-w-sm text-left p-2 flex items-center "
                  >
                    <p>
                      {user && user?.nombre?.split(" ")[0]}{" "}
                      {user && user?.apellido?.split(" ")[0]}
                    </p>
                    <img src={user.image} alt="imagen" className="img-u" />
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

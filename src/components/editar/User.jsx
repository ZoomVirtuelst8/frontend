// User.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/actions/registro/registerUser.js";
import { getUserBI } from "../../redux/actions/registro/registerUser.js";
import { getAllUbicacion } from "../../redux/actions/registro/RegisterUbicacion.js";
import { getAllPorcentaje } from "../../redux/actions/registro/registerPorcentaje.js";
import { MdOutlineSaveAs } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userBI = useSelector((state) => state.userB);
  const ubicacion = useSelector((state) => state.ubicaciones);
  const porcentaje = useSelector((state) => state.porcentajes);
  const token = useSelector((state) => state.token);

  // Estado local para manejar los datos editados
  const [editedUser, setEditedUser] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    whatsapp: "",
    ubicacion: "",
    porcentaje: "",
    admin: false,
  });

  useEffect(() => {
    dispatch(getUserBI(id, token));
    dispatch(getAllPorcentaje(token));
    dispatch(getAllUbicacion(token));
  }, [dispatch, id]);
  useEffect(() => {
    setEditedUser({
      nombre: userBI?.nombre || "",
      apellido: userBI?.apellido || "",
      direccion: userBI?.direccion || "",
      telefono: userBI?.telefono || "",
      whatsapp: userBI?.whatsapp || "",
      ubicacion: userBI?.p_ubicacion?.ubicacion || "",
      porcentaje: userBI?.p_porcentaje?.nombre || "",
      admin: userBI?.admin || false,
    });
  }, [userBI]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(id, editedUser, token));
    navigate(`/modelo/${id}`);
  };
  const handleCancelar = () => {
    setEditedUser({
      nombre: userBI?.nombre || "",
      apellido: userBI?.apellido || "",
      direccion: userBI?.direccion || "",
      telefono: userBI?.telefono || "",
      whatsapp: userBI?.whatsapp || "",
      ubicacion: userBI?.p_ubicacion?.ubicacion || "",
      porcentaje: userBI?.p_porcentaje?.nombre || "",
      admin: userBI?.admin || false,
    });
    navigate(`/modelo`);
  };
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div className="divTitulo">
          <h1 className="titulo">Edicion de Usuario</h1>
        </div>
        <div>
          <form>
            <section className="sectionform">
              <section className="sectionGlobal">
                <section className="section">
                  <div className="divlabel">
                    <label className="label">Nombre:</label>
                  </div>
                  <div className="divinput">
                    <input
                      type="text"
                      name="nombre"
                      value={editedUser.nombre}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">Apellido:</label>
                  </div>
                  <div className="divinput">
                    {" "}
                    <input
                      type="text"
                      name="apellido"
                      value={editedUser.apellido}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">direccion:</label>
                  </div>
                  <div className="divinput">
                    <input
                      type="text"
                      name="direccion"
                      value={editedUser.direccion}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">telefono:</label>
                  </div>
                  <div className="divinput">
                    <input
                      type="text"
                      name="telefono"
                      value={editedUser.telefono}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">whatsapp:</label>
                  </div>
                  <div className="divinput">
                    <input
                      type="text"
                      name="whatsapp"
                      value={editedUser.whatsapp}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">Admin:</label>
                  </div>
                  <div className="divinput">
                    <select
                      className="select text-lg"
                      name="admin"
                      value={editedUser.admin.toString()}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.value === "true",
                          },
                        })
                      }
                    >
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">Ubicación:</label>
                  </div>
                  <div className="divinput">
                    <select
                      className="select text-lg"
                      name="ubicacion"
                      value={editedUser.ubicacion}
                      onChange={handleInputChange}
                    >
                      <option value={editedUser.ubicacion}>
                        {ubicacion.find((x) => x.id === editedUser.ubicacion)
                          ?.ubicacion || editedUser.ubicacion}
                      </option>
                      {ubicacion.map((ubicacion) => (
                        <option key={ubicacion.id} value={ubicacion.id}>
                          {ubicacion.ubicacion}
                        </option>
                      ))}
                    </select>
                  </div>
                </section>

                <section className="section">
                  <div className="divlabel">
                    <label className="label">Porcentaje:</label>
                  </div>
                  <div className="divinput">
                    <select
                      className="select text-lg"
                      name="porcentaje"
                      value={editedUser.porcentaje}
                      onChange={handleInputChange}
                    >
                      <option value={editedUser.porcentaje}>
                        {porcentaje.find((x) => x.id === editedUser.porcentaje)
                          ?.nombre || editedUser.porcentaje}
                      </option>
                      {porcentaje.map((porcentaje) => (
                        <option key={porcentaje.id} value={porcentaje.id}>
                          {porcentaje.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </section>
              </section>
            </section>
          </form>
          <button onClick={handleUpdateUser} className="btns">
            <MdOutlineSaveAs className="text-4xl" />
          </button>
          <button className="btns" onClick={handleCancelar}>
            <FcCancel className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;

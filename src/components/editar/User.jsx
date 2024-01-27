// User.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/actions/registro/registerUser.js";
import { getUserBI } from "../../redux/actions/registro/registerUser.js";
import { getAllUbicacion } from "../../redux/actions/registro/RegisterUbicacion.js";
import { getAllPorcentaje } from "../../redux/actions/registro/registerPorcentaje.js";
import { MdOutlineSaveAs } from "react-icons/md";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userBI = useSelector((state) => state.userB);
  const ubicacion = useSelector((state) => state.ubicaciones);
  const porcentaje = useSelector((state) => state.porcentajes);

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
    dispatch(getUserBI(id));
    dispatch(getAllPorcentaje());
    dispatch(getAllUbicacion());
  }, [dispatch, id]);
  useEffect(() => {
    setEditedUser({
      nombre: userBI.nombre || "",
      apellido: userBI.apellido || "",
      direccion: userBI.direccion || "",
      telefono: userBI.telefono || "",
      whatsapp: userBI.whatsapp || "",
      ubicacion: userBI.p_ubicacion.ubicacion || "",
      porcentaje: userBI.p_porcentaje.nombre || "",
      admin: userBI.admin || false,
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
    dispatch(updateUser(id, editedUser));
    navigate(`/modelo/${id}`);
  };
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div className="divTitulo">
          <h1 className="titulo">Edicion de Usuario</h1>
        </div>
        <div>
          <form>
            <div className="divDetail">
              <label className="text-right">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={editedUser.nombre}
                onChange={handleInputChange}
                className="inputEdit w-96"
              />
            </div>
            <div className="divDetail">
              <label className="text-right">Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={editedUser.apellido}
                onChange={handleInputChange}
                className="inputEdit w-96"
              />
            </div>
            <div className="divDetail">
              <label className="text-right">direccion:</label>
              <input
                type="text"
                name="direccion"
                value={editedUser.direccion}
                onChange={handleInputChange}
                className="inputEdit w-96"
              />
            </div>
            <div className="divDetail">
              <label className="text-right">telefono:</label>
              <input
                type="text"
                name="telefono"
                value={editedUser.telefono}
                onChange={handleInputChange}
                className="inputEdit w-96"
              />
            </div>
            <div className="divDetail">
              <label className="text-right">whatsapp:</label>
              <input
                type="text"
                name="whatsapp"
                value={editedUser.whatsapp}
                onChange={handleInputChange}
                className="inputEdit w-96"
              />
            </div>
            <div className="divDetail">
              <label className="text-right">Admin:</label>
              <select
                className="selectEdit"
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
                <option value="true" className="text-lg">
                  Sí
                </option>
                <option value="false" className="text-lg">
                  No
                </option>
              </select>
            </div>

            <div className="divDetail">
              <label className="text-right">Ubicación:</label>
              <select
                className="selectEdit"
                name="ubicacion"
                value={editedUser.ubicacion}
                onChange={handleInputChange}
              >
                <option value={editedUser.ubicacion} className="text-lg" hidden>
                  {ubicacion.find(x => x.id === editedUser.ubicacion)?.ubicacion || editedUser.ubicacion}
                </option>
                {ubicacion.map((ubicacion) => (
                  <option key={ubicacion.id} value={ubicacion.id} className="text-lg">
                    {ubicacion.ubicacion}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="divDetail">
              <label className="text-right">Porcentaje:</label>
              <select
                className="selectEdit"
                name="porcentaje"
                value={editedUser.porcentaje}
                onChange={handleInputChange}
              >
                <option value={editedUser.porcentaje} className="text-lg" hidden>
                {porcentaje.find(x => x.id === editedUser.porcentaje)?.nombre || editedUser.porcentaje}
                </option>
                {porcentaje.map((porcentaje) => (
                  <option key={porcentaje.id} value={porcentaje.id} className="text-lg">
                    {porcentaje.nombre}
                  </option>
                ))}
              </select>
            </div>

          </form>
          <button onClick={handleUpdateUser} className="btn-n">
            <MdOutlineSaveAs className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;

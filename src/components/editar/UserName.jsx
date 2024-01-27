import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserNameById, updateUserName } from "../../redux/actions/registro/registerUserName";
import { MdOutlineSaveAs } from "react-icons/md";
const UserName = () => {
  const navigate = useNavigate()
  const userName = useSelector((state) => state.userName);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Estado local para rastrear el nombre de usuario editado
  const [editedUserName, setEditedUserName] = useState({
    userName: ""
  });

  useEffect(() => {
    dispatch(getUserNameById(id));
  }, [dispatch, id]);

  // Función para manejar cambios en el input de edición
  const handleInputChange = (e) => {
    setEditedUserName({
      ...editedUserName,
      userName: e.target.value});
  };

  // Función para manejar la actualización del nombre de usuario
  const handleUpdateUserName = () => {
    dispatch(updateUserName(id, editedUserName));
    navigate('/modelo');
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div className="divTitulo">
          <h1 className="titulo">Editar UserName</h1>
          {userName && (
            <div>
              {/* Mostrar el nombre de usuario actual */}
              <h1>{userName.userName}</h1>

              {/* Formulario para editar el nombre de usuario */}
              <input
                type="text"
                value={editedUserName.userName}
                onChange={handleInputChange}
                className="inputEdit"
              />
              <button onClick={handleUpdateUserName} className="btn-n">
                <MdOutlineSaveAs className="text-2xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserName;

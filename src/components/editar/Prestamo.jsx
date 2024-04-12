import React, { useEffect, useState } from "react";
import {
  getPrestamoById,
  updatePrestamo,
} from "../../redux/actions/registro/registerPrestamos";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineSaveAs } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const Prestamo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prestamos = useSelector((state) => state.prestamo);
  const token = useSelector((state) => state.token);

  const [nPrestamo, setNPrestamo] = useState({
    cantidad: "",
  });
  useEffect(() => {
    dispatch(getPrestamoById(id, token));
  }, [dispatch]);

  useEffect(() => {
    setNPrestamo({ ...nPrestamo, cantidad: prestamos.cantidad || "" });
  }, [prestamos]);

  const handleSavePrestamo = (e) => {
    setNPrestamo({ ...nPrestamo, cantidad: e.target.value });
  };
  const updatePrestamos = () => {
    dispatch(updatePrestamo(prestamos.id, nPrestamo, token));
    navigate("/home");
  };
  return (
    <div className="contenedor">
      <div className="contenedor1">
        <div className="divTitulo">
          <h1 className="titulo">Editar Prestamo</h1>
        </div>
        <form>
          <section>
            <label className="label">Valor</label>
            <input
              type="number"
              value={nPrestamo.cantidad}
              onChange={handleSavePrestamo}
              className="input no-spin"
            />
          </section>
          <button onClick={updatePrestamos} className="btns">
            <MdOutlineSaveAs className="text-2xl" />
          </button>
          <button onClick={updatePrestamos} className="btns">
            <FcCancel className="text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Prestamo;

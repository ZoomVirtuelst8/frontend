import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSaveAs } from "react-icons/md";
import {
  getAllProductos,
  updateProducto,
  deleteProducto,
} from "../../redux/actions/registro/registerProductos";

const Productos = () => {
  const productos = useSelector((state) => state.productos);
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  useEffect(() => {
    dispatch(getAllProductos());
  }, [dispatch]);

  const handleEditProduct = (producto) => {
    setEditProduct(producto);
  };

  const handleSaveChanges = () => {
    dispatch(updateProducto(editProduct));
    setEditProduct(null);
  };
const handleDelete = (id) => {
  dispatch(deleteProducto(id))
}
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div className="divTitulo">
          <h1 className="titulo">PRODUCTOS</h1>
        </div>

        {productos && (
          <div className="grid grid-cols-4 px-2 m-2">
            {productos?.map((producto) => {
              return (
                <div
                  key={producto.id}
                  className="w-fit m-4 border-4 rounded-lg border-indigo-400"
                >
                  <img src={producto.imagen} alt={producto.nombre} />
                  <h1>{producto?.nombre}</h1>
                  <p>{producto?.descripcion}</p>
                  {editProduct && editProduct.id === producto.id ? (
                    <div className="flex flex-col justify-center items-center">
                      <input
                        type="text"
                        value={editProduct.nombre}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            nombre: e.target.value,
                          })
                        }
                        className="inputEdit"
                      />
                      <input
                        value={editProduct.descripcion}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            descripcion: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editProduct.imagen}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            imagen: e.target.value,
                          })
                        }
                        className="inputEdit"
                      />
                      <button onClick={handleSaveChanges} className="btn-n">
                        <MdOutlineSaveAs className="text-2xl" />
                      </button>
                    </div>
                  ) : (
                    <section className="flex justify-between items-center mx-6">
                      <button
                        className="btn-n"
                        onClick={() => handleEditProduct(producto)}
                      >
                        <GrEdit className="text-2xl" />
                      </button>
                      <button className="btn-n " onClick={() => handleDelete(producto.id)}>
                        <RiDeleteBin6Line className="text-2xl" />
                      </button>
                    </section>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;

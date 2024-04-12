import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSaveAs } from "react-icons/md";
import {
  getAllProductos,
  updateProducto,
  deleteProducto,
} from "../../redux/actions/registro/registerProductos";

const Productos = () => {
  const productos = useSelector((state) => state.productos);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  useEffect(() => {
    dispatch(getAllProductos(token));
  }, [dispatch]);

  const handleEditProduct = (producto) => {
    setEditProduct(producto);
  };

  const handleSaveChanges = () => {
    dispatch(updateProducto(editProduct, token));
    setEditProduct(null);
  };
const handleDelete = (id) => {
  dispatch(deleteProducto(id, token))
}
  return (
    <div className="contenedor">
      <div className="contenedor1">
        <div className="divTitulo">
          <h1 className="titulo">PRODUCTOS</h1>
        </div>

        {productos && (
          <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 px-2 m-2">
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
                        className="input"
                      />
                      <input
                        value={editProduct.descripcion}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            descripcion: e.target.value,
                          })
                        }
                        className="input"
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
                        className="input"
                      />
                      <button onClick={handleSaveChanges} className="btns">
                        <MdOutlineSaveAs className="text-2xl" />
                      </button>
                    </div>
                  ) : (
                    <section className="flex justify-between items-center mx-6">
                      <button
                        className="btns"
                        onClick={() => handleEditProduct(producto)}
                      >
                        <GoPencil  className="text-2xl" />
                      </button>
                      <button className="btns" onClick={() => handleDelete(producto.id)}>
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

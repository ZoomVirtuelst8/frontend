import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/actions/registro/registerComment.js";

const RegistrarComment = () => {
  const navigate = useNavigate()
  const comment = useSelector((state) => state.comment);
  const errors = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comments, setComments] = useState({
    comment: "",
    userId: id,
  });


  const handleComment = (event) => {
    setComments({
      ...comments,
      comment: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(postComment(comments));
    navigate(`/modelo/${id}`)
  };
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <form onSubmit={handleSubmit} className="flex justify-center">
          <section className="flex flex-col items-center  px-10 bg-indigo-300 max-w-min rounded-lg m-2 p-1 ">
            <section className="w-96 m-4">
              <label>Nombre Del Producto:</label>
              <textarea
                type="text"
                value={comments.comment}
                onChange={handleComment}
                name="nombre"
                placeholder="Escriba el nombre del producto"
                className="input h-36"
              />
            </section>
            {/* {error && (
              <div className="text-center text-red-500 font-bold">{error}</div>
            )} */}

            <section className="flex items-center justify-center">
              <button type="submit" className="btn-w w-auto font-bold text-4xl">
                <BiSend />
              </button>
            </section>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegistrarComment;

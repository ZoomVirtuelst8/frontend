import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/actions/registro/registerComment.js";

const RegistrarComment = () => {
  const navigate = useNavigate();
  const comment = useSelector((state) => state.comment);
  const errors = useSelector((state) => state.comment);
  const token = useSelector((state) => state.token);
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
    dispatch(postComment(comments, token));
    navigate(`/modelo/${id}`);
  };
  return (
    <div className="contenedor">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="divTitulo">
            <h1 className="titulo">Su Comentario:</h1>
          </div>
          <section className="sectionform">
            <section className="section">
              <div className="divinput">
                <textarea
                  type="text"
                  value={comments.comment}
                  onChange={handleComment}
                  name="nombre"
                  placeholder="Escriba aqui un comentario sea lo mas breve prosible"
                  cols="100"
                  rows="15"
                  className="text-m u"
                />
              </div>
            </section>
            {/* {error && (
              <div className="text-center text-red-500 font-bold">{error}</div>
            )} */}
          </section>
          <section className="sectionbtns">
            <button type="submit" className="btns">
              <BiSend className="BiSend" />
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegistrarComment;

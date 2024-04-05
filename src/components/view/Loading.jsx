import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const Loading = () => {
  const token = useSelector(state => state.token)
  const navigate = useNavigate();
  useEffect(() => {
   
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.admin) {
          setTimeout(() => {
            navigate("/home");
          }, 5000); // Redirige a /home después de 5 segundos
        } else {
          setTimeout(() => {
            navigate(`/user/${decodedToken.session}`);
          }, 5000); // Redirige a /user/:id después de 5 segundos
        }
      } catch (error) {
        // Error al decodificar el token, redirigir a "/"
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } else {
      // No hay token presente, redirigir a "/"
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, []);
  return (
    <div>
      <div className=" bg-indigo-200 dark:bg-slate-900 min-h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loading;

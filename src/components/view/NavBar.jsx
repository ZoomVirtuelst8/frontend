import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSession } from "../../redux/actions/cerrarSession";
const history = createBrowserHistory();
import { TfiAlignJustify } from "react-icons/tfi";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.token)
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const isUserOrModelRoute = /^\/(user|modelo)\/\d+$/i.test(pathname);
  const isInvalidRoute =
    pathname.includes("/user/undefined") || pathname.includes("undefined");
  // In case the user signs out while on the page.
  //* para manejar la navbar responsive
  const [showMenu, setShowMenu] = useState(false);

  //* para saber que resolucion se esta manejando
  const isScreenWidth = () => {
    return window.innerWidth > 640;
  };
  // Decodifica el token para acceder a la información
  const decodedToken =
    token !== null ? jwtDecode(token) : history.push("/");
  // decodedToken.admin = false;

  useEffect(() => {
    if (token.length === 0) {
      navigate("/");
    }
    if (
      !isUserOrModelRoute &&
      !decodedToken.admin &&
      decodedToken.id &&
      !pathname.includes("?")
    ) {
      navigate(`user/${decodedToken.id}`);
    }

    if (decodedToken.admin) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
    if (isInvalidRoute) {
      navigate("/");
    }
  }, [
    decodedToken.id,
    decodedToken.admin,
    navigate,
    isInvalidRoute,
    pathname,
    isUserOrModelRoute,
    token.length,
  ]);

  // para manejar la resolucion
  useEffect(() => {
    setShowMenu(isScreenWidth());
    const handleResize = () => {
      setShowMenu(isScreenWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //* para mostrar el menu
  const toggleMenu = () => {
    if (!isScreenWidth()) {
      setShowMenu(!showMenu);
    }
  };
  const handleNavLinkClick = () => {
    if (!isScreenWidth()) {
      setShowMenu(false);
    }
  };
  //! cerra session
  const handleSession = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("accessToken");
    dispatch(cerrarSession());
    navigate("/");
  };
  return (
    <div className="">
      {showMenu && (
        <nav className="navbar">
          <div className={`${isScreenWidth() ? "flex items-center":"grid grid-cols-1 text-center"}`}>
          {showButton && (
            <NavLink to="/home">
              <button className="btns" onClick={handleNavLinkClick}>
                Home
              </button>
            </NavLink>
          )}
          {showButton && (
            <NavLink to="/editar/producto">
              <button className="btns" onClick={handleNavLinkClick}>
                Editar Producto
              </button>
            </NavLink>
          )}
          {showButton && (
            <NavLink to={"/crear"}>
              <button className="btns" onClick={handleNavLinkClick}>
                Registros
              </button>
            </NavLink>
          )}
          {showButton && (
            <NavLink to={"/ventas"}>
              <button className="btns" onClick={handleNavLinkClick}>
                Ventas
              </button>
            </NavLink>
          )}
          {showButton && (
            <NavLink to={"/modelo"}>
              <button className="btns" onClick={handleNavLinkClick}>
                Modelos
              </button>
            </NavLink>
          )}
         
          <button onClick={handleSession} className="btnssesion">
            {decodedToken.nombre} {''}
            {decodedToken.apellido}
          </button>
          </div>
        </nav>
      )}
      <div
        className={`sm:flex sm:justify-center dark:bg-slate-700 sm:text-center sm:items-center sm:mx-auto md:hidden ${
          showMenu ? "hidden" : ""
        }`}
        onClick={toggleMenu}
      >
        <TfiAlignJustify />
      </div>
    </div>
  );
};

export default NavBar;

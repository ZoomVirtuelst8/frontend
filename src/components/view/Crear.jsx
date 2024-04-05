import React from "react";
import { NavLink } from "react-router-dom";

const Crear = () => {
  return (
    <div className="contenedor">
      <div className="text-center">
        <div className="divTitulo">

        <h1 className="titulo">Que Desea Hacer Hoy</h1>
        </div>
        <section className=" grid md:grid-cols-3 sm:grid-cols-1">
          <NavLink to="/crear/pagina">
            <button className="btns h-20 w-48">Registrar Pagina</button>
          </NavLink>

          <NavLink to="/crear/registro">
            <button className="btns h-20 w-48">Registrar User</button>
          </NavLink>

          <NavLink to="/crear/username">
            <button className="btns h-20 w-48">Registrar UserName</button>
          </NavLink>

          <NavLink to="/crear/ralacion">
            <button className="btns h-20 w-48">Relacion Ubicacion Y Porcentaje</button>
          </NavLink>

          <NavLink to="/crear/estadisticas">
            <button className="btns h-20 w-48">Registrar Estadisticas</button>
          </NavLink>

          <NavLink to="/crear/prestamos">
            <button className="btns h-20 w-48">Registrar Prestamos</button>
          </NavLink>

          <NavLink to="/crear/producto">
            <button className="btns h-20 w-48">Registrar Producto</button>
          </NavLink>
          
          <NavLink to="/crear/compras">
            <button className="btns h-20 w-48">Registrar Compras</button>
          </NavLink>

          <NavLink to="/crear/quincena">
            <button className="btns h-20 w-48">Registrar Quincena</button>
          </NavLink>
          <NavLink to="/crear/moneda">
            <button className="btns h-20 w-48">Registrar Moneda</button>
          </NavLink>

          <NavLink to="/crear/porcentaje">
            <button className="btns h-20 w-48">Registrar Porcentaje</button>
          </NavLink>

          <NavLink to="/crear/ubicacion">
            <button className="btns h-20 w-48">Registrar Ubicacion</button>
          </NavLink>

        </section>
      </div>
    </div>
  );
};

export default Crear;

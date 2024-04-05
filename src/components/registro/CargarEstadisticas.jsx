import React from "react";
import { Link } from "react-router-dom";


const CargarEstadisticas = () => {
  return (
    <div className="contenedor">
      <div className="">
      <h3 className="font-bold text-center text-xl sm:text-lg">
        Click en el Logo de la pagina que desea cargar
      </h3>

      <div className="font-bold grid md:grid-cols-4 sm:grid-cols-1 text-center">
        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/adultregular">
            <p>Corte</p>
            <div className="bg-white mt-2 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/AWLogo_on.png" alt="logo AdultWork" className="mx-4" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/adultparcial">
            <p>Parcial</p>
            <div className="bg-white mt-2 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/AWLogo_on.png" alt="logo AdultWork" className="mx-4" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/amateur">
            <p>Amateur</p>
            <div className="bg-red-600 mt-2 rounded-xl p-2 h-20 w-30 flex justify-center items-center">
              <img src="/Amateur.png" alt="logo Amateur" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/bonga">
            <p>Bonga</p>
            <img
              src="/bonga.jpeg"
              alt="logo Bonga"
              className="mt-2 rounded-xl"
            />
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/cam4">
            <p>Cam4</p>
            <div className="bg-black mt-6 rounded-xl h-20 p-2 w-30 flex justify-center items-center">
              <img src="/Cam4.png" alt="logo Cam4" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/chaturbate">
            <p className="">Chaturbate</p>
            <div className=" bg-slate-200 p-2 h-20 rounded-xl mt-6 flex justify-center items-center ">
              <img src="/Chaturbate_logo.svg" alt="logo Chaturbate" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e flex justify-center">
          <Link to="/estadisticas/carga/dirty">
            <p className="m-1 mb-6 ">My Dirty</p>
            <div className="bg-stone-900 mt-2 p-1 rounded-xl h-16 w-30 flex justify-center items-center">
              <img src="/mydirty.png" alt="logo Dirty" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e ">
          <Link to="/estadisticas/carga/islive">
            <p>Club Is Live</p>
            <img
              src="/clubIsLive.png"
              alt="logo Club Is Live"
              className="mt-6 rounded-xl h-20"
            />
          </Link>
        </section>

        <section className="w-48 img-e ">
          <Link to="/estadisticas/carga/mondo">
            <p>Mondo</p>
          <div className="bg-black mt-8 p-2 rounded-xl h-16 w-30 flex justify-center items-center">
            <img
              src="/logo-mondocamgirls.svg"
              alt="logo mondo cam girls"
              className=" rounded-xl h-20"
            />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e ">
          <Link to="/estadisticas/carga/myfreecams">
            <p>My Free Cams</p>
          <div className="bg-white mt-8 p-2 rounded-xl h-16 w-30 flex justify-center items-center">
            <img
              src="/MyFreeCams_-_logo.svg"
              alt="logo myFreecams"
              className=" rounded-xl h-20"
            />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e ">
          <Link to="/estadisticas/carga/sakura">
            <p>Sakura</p>
          <div className="bg-pink-950 mt-8 p-2 rounded-xl h-16 w-30 flex justify-center items-center">
            <img
              src="/Logo-SakuraLive.png"
              alt="logo sakura"
              className=" rounded-xl"
            />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/sender">
            <p>Sender</p>
            <div className="bg-black mt-6 p-1 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/livestrip.webp" alt="logo Sender" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/skype">
            <p>Skype</p>
            <div className="bg-white mt-6 p-2 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/Skype.webp" alt="logo Skype" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/streamate">
            <p>Streamate</p>
            <div className="bg-black mt-6 p-2 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/92393-1569967393-Streamate_on_dark.png" alt="logo Streamete"  />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/streamray">
            <p>Stream Ray</p>
            <div className="bg-sky-950 mt-6 p-2 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/Streamray_250x50_2021.svg" alt="logo Stream Ray"  />
            </div>
          </Link>
        </section>

        <section className="img-e w-48 flex justify-center">
          <Link to="/estadisticas/carga/stripchat">
            <p>Stripchat</p>
            <div className="bg-white mt-6 p-10 rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/stripchat.png" alt="logo Stripchat" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/triplesiete">
            <p>7 7 7</p>
            <div className="bg-red-950 mt-6 h-20 rounded-xl  w-30 flex justify-center items-center">
              <img src="/logo777.png" alt="logo 777" className="w-48 h-28 m-1 rounded-2xl p-1 pt-3" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/vx">
            <p>Vx</p>
            <div className="bg-black mt-6  rounded-xl h-20 w-30 flex justify-center items-center">
              <img src="/VxMaster.svg" alt="logo Vx master" className="w-36 h-16 m-1 rounded-2xl " />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/xlove">
            <p>Xlove</p>
            <div className="bg-red-800 mt-6 p-2 rounded-xl">
              <img src="/xlove.png" alt="logo Xlove" />
            </div>
          </Link>
        </section>

        <section className="w-48 img-e">
          <Link to="/estadisticas/carga/xlovenueva">
            <p>Xlove Nueva</p>
            <div className="bg-red-800 mt-6 p-2 rounded-xl">
              <img src="/xlove.png" alt="logo Xlove nueva" />
            </div>
          </Link>
        </section>

      </div>
      </div>
    </div>
  );
};
export default CargarEstadisticas;


import { Routes, Route, useLocation } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

import Adultregular from "./components/paginas/Adultregular";
import Adultparcial from "./components/paginas/Adultparcial";
import Amateur from "./components/paginas/Amateur.jsx";
import Bonga from "./components/paginas/Bonga.jsx";
import Cam4 from "./components/paginas/Cam4.jsx";
import Chaturbate from "./components/paginas/Chaturbate.jsx";
import Dirty from "./components/paginas/Dirty.jsx";
import IsLive from "./components/paginas/IsLive.jsx";
import Mondo from "./components/paginas/Mondo.jsx";
import MyFreeCams from "./components/paginas/MyFreeCams.jsx";
import Sakura from "./components/paginas/Sakura.jsx";
import Streamate from "./components/paginas/Streamate";
import StreamRay from "./components/paginas/StreamRay.jsx";
import Sender from "./components/paginas/Sender.jsx";
import Skype from "./components/paginas/Skype.jsx";
import Stripchat from "./components/paginas/Stripchat.jsx";
import Vx from "./components/paginas/Vx.jsx";
import Xlove from "./components/paginas/Xlove.jsx";
import XloveNueva from "./components/paginas/XloveNueva.jsx";

import NavBar from "./components/view/NavBar.jsx";
import Home from "./components/view/Home.jsx";
import Login from "./components/view/Login.jsx";
import User from "./components/view/User.jsx";
import Loading from "./components/view/Loading.jsx";
import Crear from "./components/view/Crear.jsx";
import Modelos from "./components/view/Modelos.jsx";
import DetailUser from "./components/view/DetailUser.jsx";
import Ventas from "./components/view/Ventas.jsx";

import RegisterUser from "./components/registro/RegisterUser.jsx";
import RegistrarPagina from "./components/registro/RegistrarPagina.jsx";
import RegistrarProducto from "./components/registro/RegistrarProducto.jsx";
import RegistroUserName from "./components/registro/RegistroUserName.jsx";
import RegistrarComment from "./components/registro/RegistrarComment.jsx";
import RegistrarQuincena from "./components/registro/RegistrarQuincena.jsx";
import RegistrarMoneda from "./components/registro/RegisterMoneda.jsx";
import CargarEstadisticas from "./components/registro/CargarEstadisticas.jsx";
import RegisterPorcentaje from "./components/registro/RegisterPorcentaje.jsx";
import RegisterUbicacion from "./components/registro/RegisterUbicacion";
import RegisterCompras from "./components/registro/RegisterCompras.jsx";

import Productos from "./components/editar/Productos.jsx";
import UserName from "./components/editar/UserName.jsx";
import UserEdit from "./components/editar/User.jsx";
import Prestamo from "./components/editar/Prestamo.jsx";


import RelationUbicationAndPorcenaje from "./components/registro/RelationUbicacionAndPorcentaje";
import Prestamos from "./components/registro/Prestamos.jsx";

import Protected from "./components/resource/Protected.jsx";
import DarkMode from './components/resource/DarkMode.jsx';
import TripleSiete from "./components/paginas/TripleSiete.jsx";

function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { pathname } = useLocation();

  const protecte = [
    "/home",
    "/loader",
    "/registro",
    "/crear",
    "/crear/username",
    "/crear/pagina",
    "/crear/producto",
    "/crear/quincena",
    "/crear/moneda",
    "/crear/estadisticas",
    "/crear/porcentaje",
    "/crear/ubicacion",
    "/crear/compras",
    "/crear/prestamos",
    "/crear/ralacion",
    "/editar/producto",
    "/editar/username/:id",
    "/editar/user/:id",
    "/editar/prestamo/:id",
    "/user/:id",
    "/modelo/comment/:id",
    "/ventas",
    "/estadisticas/carga/adultparcial",
    "/estadisticas/carga/adultregular",
    "/estadisticas/carga/amateur",
    "/estadisticas/carga/bonga",
    "/estadisticas/carga/cam4",
    "/estadisticas/carga/chaturbate",
    "/estadisticas/carga/dirty",
    "/estadisticas/carga/islive",
    "/estadisticas/carga/mondo",
    "/estadisticas/carga/myfreecams",
    "/estadisticas/carga/sakura",
    "/estadisticas/carga/sender",
    "/estadisticas/carga/skype",
    "/estadisticas/carga/streamate",
    "/estadisticas/carga/streamray",
    "/estadisticas/carga/stripchat",
    "/estadisticas/carga/vx",
    "/estadisticas/carga/xlove",
    "/estadisticas/carga/xlovenueva",
  ];
  if (!isLoaded || (!userId && protecte.includes(pathname))) {
    return <Protected />;
  }
  
  return (
    <div>
      {pathname !== "/" &&
        pathname !== "/registro" &&
        pathname !== "/sign-in" &&
        pathname !== "/loader" && <NavBar />}
        
     <DarkMode />
      <Routes>
        <Route path="/protected" element={<Protected />} />
        <Route
          path="/sign-in"
          element={
            <div className="flex justify-center items-center h-screen">
              <SignIn />
            </div>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/loader" element={<Loading />} />
        <Route path="/registro" element={<RegisterUser />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/crear/username" element={<RegistroUserName />} />
        <Route path="/crear/pagina" element={<RegistrarPagina />} />
        <Route path="/crear/producto" element={<RegistrarProducto />} />
        <Route path="/crear/quincena" element={<RegistrarQuincena />} />
        <Route path="/crear/moneda" element={<RegistrarMoneda />} />
        <Route path="/crear/estadisticas" element={<CargarEstadisticas />} />
        <Route path="/crear/porcentaje" element={<RegisterPorcentaje />} />
        <Route path="/crear/ubicacion" element={<RegisterUbicacion />} />
        <Route path="/crear/compras" element={<RegisterCompras />} />
        <Route path="/crear/prestamos" element={<Prestamos />} />
        {/* <Route path="/crear/rojos" element={<RegisterRojos />} /> */}
        <Route
          path="/crear/ralacion"
          element={<RelationUbicationAndPorcenaje />}
        />
        <Route path="/editar/producto" element={<Productos />} />
        <Route path="/editar/username/:id" element={<UserName />} />
        <Route path="/editar/user/:id" element={<UserEdit />} />
        <Route path="/editar/prestamo/:id" element={<Prestamo />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/modelo" element={<Modelos />} />
        <Route path="/modelo/:id" element={<DetailUser />} />
        <Route path="/modelo/comment/:id" element={<RegistrarComment />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        //* paginas
        {/* <Route path="/estadisticas" element={<Estadisticas />} /> */}
        <Route
          path="/estadisticas/carga/adultparcial"
          element={<Adultparcial />}
        />
        <Route
          path="/estadisticas/carga/adultregular"
          element={<Adultregular />}
        />
        <Route path="/estadisticas/carga/amateur" element={<Amateur />} />
        <Route path="/estadisticas/carga/bonga" element={<Bonga />} />
        <Route path="/estadisticas/carga/cam4" element={<Cam4 />} />
        <Route path="/estadisticas/carga/chaturbate" element={<Chaturbate />} />
        <Route path="/estadisticas/carga/dirty" element={<Dirty />} />
        <Route path="/estadisticas/carga/islive" element={<IsLive />} />
        <Route path="/estadisticas/carga/mondo" element={<Mondo />} />
        <Route path="/estadisticas/carga/myfreecams" element={<MyFreeCams />} />
        <Route path="/estadisticas/carga/sakura" element={<Sakura />} />
        <Route path="/estadisticas/carga/sender" element={<Sender />} />
        <Route path="/estadisticas/carga/skype" element={<Skype />} />
        <Route path="/estadisticas/carga/streamate" element={<Streamate />} />
        <Route path="/estadisticas/carga/streamray" element={<StreamRay />} />
        <Route path="/estadisticas/carga/stripchat" element={<Stripchat />} />
        <Route path="/estadisticas/carga/triplesiete" element={<TripleSiete />} />
        <Route path="/estadisticas/carga/vx" element={<Vx />} />
        <Route path="/estadisticas/carga/xlove" element={<Xlove />} />
        <Route path="/estadisticas/carga/xlovenueva" element={<XloveNueva />} />
        {/* <Route path="/registrod" element={<Registro />} /> */}
      </Routes>
    </div>
  );
}

export default App;

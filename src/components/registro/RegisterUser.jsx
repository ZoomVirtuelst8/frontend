// importaciones generales
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//importaciones de funciones desde el redux
import { registroUser } from "../../redux/actions/registro/registerUser.js";
import { resetError } from "../../redux/actions/resetError.js";
// vaidaciones de inputs
const validacion = (input) => {
let error = {};
  //validacion nombre
  if (input.nombre.length < 3 || input.nombre.length === 0) {
    error.nombre = "El nombre es requisito obligatorio"; 
  }
  //validacion apellido
  if (input.apellido.length < 3 || input.apellido === 0) {
    error.apellido = "El apellido es requisito obligatorio";
  }
  //validacion nacionalidad
  if (input.nacionalidad === "") {
    error.nacionalidad = "seleccione su pais de origen";
  }
  //validacion cedula
  if (input.cedula.length < 3 || input.cedula.length === 0) {
    error.cedula = "La cédula es requisito obligatorio";
  } else {
    if (input.nacionalidad === "Colombia") {
      const cedulaColombianaRegex = /^\d{7,11}$/;
      if (!cedulaColombianaRegex.test(input.cedula)) {
        error.cedula = "Cédula colombiana errónea";
      }
    } else if (input.nacionalidad === "Venezuela") {
      const cedulaVenezolanaRegex = /^\d{5,9}$/;
      if (!cedulaVenezolanaRegex.test(input.cedula)) {
        error.cedula = "Cédula venezolana errónea";
      }
    }
  }
  //validacion fecha de nacimiento
  if (!input.fechaDeNacimiento) {
    error.fechaDeNacimiento = "La fecha de nacimiento es requisito obligatorio";
  } else {
    const hoy = new Date();
    const partesFecha = input.fechaDeNacimiento.split("/"); // Dividir el string en partes: [día, mes, año]

    const diaNacimiento = parseInt(partesFecha[0], 10);
    const mesNacimiento = parseInt(partesFecha[1], 10) - 1; // Restar 1 al mes ya que en JavaScript los meses son indexados en base 0
    const anioNacimiento = parseInt(partesFecha[2], 10);

    const fechaNacimiento = new Date(
      anioNacimiento,
      mesNacimiento,
      diaNacimiento
    );

    const edadCalculada = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaNacimient = fechaNacimiento.getDate();

    const edad =
      mesActual > mesNacimiento ||
      (mesActual === mesNacimiento && hoy.getDate() >= diaNacimient)
        ? edadCalculada
        : edadCalculada - 1;

    const edadMinima = 18;

    if (edad < edadMinima) {
      error.fechaDeNacimiento = "Debes ser mayor de 18 años";
    }
  }

  // validacion de telefono
  if (!/^3(0[0-5]|1[0-9]|2[0-9]|3[0-6])[0-9]{7}$/.test(input.telefono)) {
    error.telefono = "Numero de telefono no es valido";
  }
  if (!/^3(0[0-5]|1[0-9]|2[0-9]|3[0-6])[0-9]{7}$/.test(input.whatsapp)) {
    error.whatsapp = "Numero de WhatsApp no es valido";
  }

  if (input.direccion.length < 10 || input.direccion.length === 0) {
    error.direccion = "Direccion Invalida";
  }
  if (input.session.length < 3 || input.session.length === 0) {
    error.session = "UserName Invalido";
  }
  if (input.password.length < 4 || input.password.length === 0) {
    error.password = "Contraseña Invalida";
  }
  if (input.verify !== input.password) {
    error.verify = "Las contraseñas no coinciden";
  }

  return error;
};
// componente
const RegisterUser = () => {
  // funcionaledad
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // estados globales
  const perror = useSelector((state) => state.Error);
// estados locales
  const [error, setError] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmacion, setConfirmacion] = useState("");
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    nacionalidad: "",
    cedula: "",
    telefono: "",
    fechaDeNacimiento: "",
    whatsapp: "",
    direccion: "",
    session: "",
    password: "",
    verify: "",
  });
// funcionalidad para setear los errores estados globales del post
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  
// manejo de los inputs
  const handleNombre = (event) => {
    setInput({
      ...input,
      nombre: event.target.value,
    });
    setError(
      validacion({
        ...input,
        nombre: event.target.value,
      })
    );
  };
  const handleApellido = (event) => {
    setInput({
      ...input,
      apellido: event.target.value,
    });
    setError(
      validacion({
        ...input,
        apellido: event.target.value,
      })
    );
  };
  const handleNacionalidad = (event) => {
    setInput({
      ...input,
      nacionalidad: event.target.value,
    });
    setError(
      validacion({
        ...input,
        nacionalidad: event.target.value,
      })
    );
  };
  const handleCedula = (event) => {
    setInput({
      ...input,
      cedula: event.target.value,
    });
    setError(
      validacion({
        ...input,
        cedula: event.target.value,
      })
    );
  };
  const handleTelefono = (event) => {
    setInput({
      ...input,
      telefono: event.target.value,
    });
    setError(
      validacion({
        ...input,
        telefono: event.target.value,
      })
    );
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleFechaDeNacimiento = (date) => {
    setSelectedDate(date);
    const dateString = date
      ? date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

    setInput({
      ...input,
      fechaDeNacimiento: dateString,
    });
    setError(
      validacion({
        ...input,
        fechaDeNacimiento: dateString,
      })
    );
  };

  const handleWhtsapp = (event) => {
    setInput({
      ...input,
      whatsapp: event.target.value,
    });
    setError(
      validacion({
        ...input,
        whatsapp: event.target.value,
      })
    );
  };
  const handleDireccion = (event) => {
    setInput({
      ...input,
      direccion: event.target.value,
    });
    setError(
      validacion({
        ...input,
        direccion: event.target.value,
      })
    );
  };

  const handleSession = (event) => {
    setInput({
      ...input,
      session: event.target.value,
    });
    setError(
      validacion({
        ...input,
        session: event.target.value,
      })
    );
  };

  const handlePassword = (event) => {
    setInput({
      ...input,
      password: event.target.value,
    });
    setError(
      validacion({
        ...input,
        password: event.target.value,
      })
    );
  };

  const handleVerify = (event) => {
    setInput({
      ...input,
      verify: event.target.value,
    });
    setError(
      validacion({
        ...input,
        verify: event.target.value,
      })
    );
  };
// envio de la informacion al server
  const handleCrear = async (e) => {
    // evita el evio de informacion antes de tiempo
    e.preventDefault();
    // validacion de errores del formulario
    const errores = validacion(input);
    try {
      if (Object.keys(errores).length === 0) {
        await dispatch(registroUser(input));
      }
      setError(errores);
    } catch (error) {
    }
  };
  // manejo de errores de la peticion
  useEffect(() => {
    (async () => {
      try {
        setShowConfirmation(true)
        setConfirmacion("SE ENVIO LA SOLICITUD.");
          setTimeout(() => {
            setConfirmacion("");
            navigate("/");
          }, 2000);
          setInput({
            nombre: "",
            apellido: "",
            nacionalidad: "",
            cedula: "",
            telefono: "",
            fechaDeNacimiento: "",
            whatsapp: "",
            direccion: "",
            session: "",
            password: "",
            verify: "",
          });
          setShowForm(false);
      } catch (error) {
        showForm(true)
        setShowConfirmation(false)
      }
    })
  }, [])
  const paises = ["Colombia", "Venezuela"];
  return (
    <div className="contenedor">
      {showConfirmation && (
        <div className="contenedor2 mt-64 flex justify-center">
          <div className="text-6xl bg-indigo-300 p-4 rounded-3xl border-2 border-r-8 border-b-8 border-indigo-950">
            <h1 className="font-bold">{confirmacion}</h1>
          </div>
        </div>
      )}
      {showForm && (
        <div className="contenedor2">
          <div className="divTitulo">
            <h1 className="titulo">Registro De Usuario</h1>
          </div>
          {perror && (
            <div className="error">
              <h1>{perror}</h1>
            </div>
          )}
          <div>
            <form onSubmit={handleCrear}>
              <section className="sectionform">
                <h1 className="title2">Datos Personales</h1>
                <section className="sectionGlobal">
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Nombre:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="text"
                      placeholder="Casimira"
                      value={input.nombre}
                      name="nombre"
                      onChange={handleNombre}
                      className="input"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.nombre}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Apellido:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="text"
                      placeholder="La Visca"
                      value={input.apellido}
                      name="apellido"
                      onChange={handleApellido}
                      className="input"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.apellido}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Nacionalidad:</label>
                    </div>
                    <div className="divinput">
                    <select className="select" onChange={handleNacionalidad}>
                      <option value="" hidden>
                        selecciones un pais
                      </option>
                      {paises.map((pais) => (
                        <option value={pais} name="nacionalidad" key={pais}>
                          {pais}
                        </option>
                      ))}
                    </select>
                    </div>
                  </section>
                  {error && <div className="error">{error.nacionalidad}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Numero De Cedula:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="number"
                      placeholder="1234567890"
                      value={input.cedula}
                      name="cedula"
                      onChange={handleCedula}
                      className="input no-spin"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.cedula}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Fecha De Nacimiento:</label>
                    </div>
                    <div className="divinput">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleFechaDeNacimiento}
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      placeholderText="18/08/20223"
                      dropdownMode="select"
                      popperModifiers={{
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "viewport",
                        },
                      }}
                      customInput={
                        <input
                        type="text"
                        className="input"
                        name="fechaDeNacimiento"
                        value={selectedDate}
                        onChange={handleFechaDeNacimiento}
                        />
                      }
                      />
                    </div>
                  </section>
                  {error && (
                    <div className="error">{error.fechaDeNacimiento}</div>
                  )}
                </section>
              </section>

              <section className="sectionform">
                <h1 className="title2">Datos De Contacto:</h1>
                <section className="sectionGlobal">
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Telefono:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="number"
                      placeholder="310 000 00 00"
                      value={input.telefono}
                      name="telefono"
                      onChange={handleTelefono}
                      className="input no-spin"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.telefono}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">WhatsApp:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="number"
                      // readOnly='false'
                      placeholder="310 000 00 00"
                      value={input.whatsapp}
                      name="whatsapp"
                      onChange={handleWhtsapp}
                      min="+"
                      className="input no-spin"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.whatsapp}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Direccion:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="text"
                      placeholder="calle 1W # 57-68"
                      value={input.direccion}
                      name="direccion"
                      onChange={handleDireccion}
                      className="input"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.direccion}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">UserName:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="text"
                      placeholder="un ejemplo"
                      value={input.session}
                      name="session"
                      onChange={handleSession}
                      className="input"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.session}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Contraseña:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="password"
                      placeholder="escriba una contraseña"
                      value={input.password}
                      name="password"
                      onChange={handlePassword}
                      className="input"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.password}</div>}
                  <section className="section">
                    <div className="divlabel">
                      <label className="label">Verificacion Contraseña:</label>
                    </div>
                    <div className="divinput">
                    <input
                      type="password"
                      placeholder="escriba la contraseña"
                      value={input.verify}
                      name="verify"
                      onChange={handleVerify}
                      className="input"
                    />
                    </div>
                  </section>
                  {error && <div className="error">{error.verify}</div>}
                </section>
              </section>

              <section className="sectionbtns">
                <button className="btns" type="submit">
                  <BiSend className="BiSend" />
                </button>
              </section>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;

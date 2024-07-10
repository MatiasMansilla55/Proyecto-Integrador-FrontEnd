import React, { useState } from "react";
import LogoImage from "/Logo03.png";
import { registerUser } from "../interceptors/user.interceptor";
import ImagenLogin from "/Globos.png";

const CreateAcount = () => {
  const [usuario, setusuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    rol: "ADMIN",
  });

  const [show, setshow] = useState(false);

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
  });
  
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (usuario.nombre.length < 5) {
      formIsValid = false;
      errors["nombre"] = "El nombre debe tener al menos 5 caracteres.";
    }

    if (usuario.apellido.length < 5) {
      formIsValid = false;
      errors["apellido"] = "El apellido debe tener al menos 5 caracteres.";
    }

    if (usuario.email === ""){
      formIsValid = false;
      errors["email"] = "El email no es válido.";
    }

    if (usuario.contrasenia.length < 8) {
      formIsValid = false;
      errors["contrasenia"] = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await registerUser(usuario);
        setshow(true);
        setErrors({});
        window.location.href("/login")
      } catch (error) {
        setErrors({form: "Ocurrió un error al crear el usuario." });
        console.log("Ocurrió un error al crear el usuario", error);
      }
    }
  };

  return (
    <div className="create-account-container">
      <div className="image-container-crear-cuenta">
        <img src={ImagenLogin} className="image-cuenta" alt="Imagen Login" />
      </div>

      <div className="form-side">
        <div className="text-center">
          <h1 className="text-center text-custom-orange"></h1>
          <h2 className="titlecuenta">Crea tu cuenta</h2>
          <p className="titlecuenta">
            Ya tienes una cuenta?
            <a href="/Login" className="link-login">
              Log in{" "}
            </a>
          </p>
        </div>

        <form onSubmit={HandleSubmit} className="form-container">
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="text-inputs-form">
              Como es tu nombre?
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu nombre"
              onChange={(event) =>
                setusuario({ ...usuario, nombre: event.target.value })
              }
            />
            {errors.nombre && (
              <p className="text-danger fs-5 ms-2">{errors.nombre} </p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="text-inputs-form">
              Como es tu apellido?
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu apellido"
              onChange={(event) =>
                setusuario({ ...usuario, apellido: event.target.value })
              }
            />
            {errors.apellido && (
              <p className="text-danger fs-5 ms-2">{errors.apellido} </p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="text-inputs-form">
              Ingresa tu correo electronico
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu Correo"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) =>
                setusuario({ ...usuario, email: event.target.value })
              }
            />
            {errors.email && (
              <p className="text-danger fs-5 ms-2">{errors.email}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="InputPassword2" className="text-inputs-form">
              Crea una contraseña
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa tu Contraseña"
              id="exampleInputPassword1"
              onChange={(event) =>
                setusuario({ ...usuario, contrasenia: event.target.value })
              }
            />
            {errors.contrasenia && (
              <p className="text-danger fs-5 ms-2">{errors.contrasenia} </p>
            )}
          </div>
          <p className="titlecuenta fs-5 ms-2">
            Al crear esta cuenta estas de acuerdo con los Terminos y Condiciones
          </p>
          <button type="submit" className="btn btn-custom-green d-flex justify-content-center m-auto">
            Crear cuenta
          </button>
        </form>
        {show && (
          <h1 className="titlecuenta">Te has registrado correctamente</h1>
        )}
        {errors.form && (
          <p className="text-danger ms-2">{errors.form}</p>
        )}
      </div>
    </div>
  );
};

export default CreateAcount;

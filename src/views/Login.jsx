import React, { useState } from "react";
import ImagenLogin from "/Globos.png";
import ImagenGoogle from "/png-transparent-logo-google-g-google-s-logo-icon.png";
import { loginUser } from "../interceptors/auth.interceptor";

const Login = () => {
  const [registro, setRegistro] = useState({
    email: "",
    contrasenia: "",
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(registro);
      setShow(true);
      setError(false);
      window.location.replace("/")
      console.log(response.role);
      if (response.role == "ROLE_ADMIN" || response.role == "ROLE_USER") {
        console.log(registro);
      }
    } catch (error) {
      setError(true);
      console.error("Ocurrió un error al iniciar sesión", error);
    }
  };

  return (
    <div
      className="login-background"
      style={{
        backgroundImage: `url(${ImagenLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "119vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        marginLeft: "-10px",
        marginBottom: "-60px",
      }}
    >
      <div className="login-container mt-5">
        <div className="row-h-100 justify-content-end align-items-center mt-5">
          <div className="col-md-4 bg-white p-4 shadow rounded login-form-container mt-5">
            <h2 className="titlecuenta mb-4 text-center">Ingresa tu cuenta</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={registro.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="contrasenia"
                  value={registro.contrasenia}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
                {error && (
                  <p className="text-danger error-login">
                    Verifique su contraseña
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-iniciar-sesion">
                Continuar
              </button>
              <button type="button" className="btn btn-google">
                <img
                  src={ImagenGoogle}
                  alt=""
                  className="me-2"
                  style={{ width: "20px" }}
                />
                Ingresa con Google
              </button>
              <div className="text-center mt-4">
                <span>O</span>
              </div>
              <a
                href="/crearcuenta"
                className="btn btn-iniciar-sesion-dark w-100"
              >
                Crear cuenta
              </a>
            </form>
            {show && (
              <a href="/" className="link-login">
                Te has logueado correctamente
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import Cookies from 'js-cookie';
import { jwtVerify, SignJWT } from 'jose';

const interceptor = axios.create({
  baseURL: "https://gotravel.up.railway.app/auth"
});

const SECRET_KEY = new TextEncoder().encode('miclavenotansecreta');

// login
export const loginUser = async (user) => {
  try {
    const response = await interceptor.post("/login", user, {
      withCredentials: true
    });

    // Encripta los datos del usuario en un JWT
    const token = await new SignJWT(response.data)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(SECRET_KEY);

    // Guarda el JWT en una cookie
    Cookies.set('user', token, { expires: 7 }); 

    return response;
  } catch (error) {
    console.error("Ocurrió un error al iniciar sesión", error);
    throw error;
  }
};


//logout
export const logoutUser = async () => {
  try {
    const response = await interceptor.get("/logout", {
      withCredentials: true
    });
    Cookies.remove('user');

    return response;
  } catch (error) {
    console.error("Ocurrio un error al cerrar sesión", error);
    throw error;
  }
}

export const getUserFromCookie = async () => {
  const token = Cookies.get('user');
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      return payload;
    } catch (error) {
      console.error("Error al verificar el token", error);
      return null;
    }
  }
  return null;
}
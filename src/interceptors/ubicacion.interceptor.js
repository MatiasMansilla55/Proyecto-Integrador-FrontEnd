import axios from 'axios';

const interceptor = axios.create({
  baseURL: 'https://gotravel.up.railway.app/ubicacion',
  withCredentials: true,
});

export const createUbicacion = async (ubicacion) => {
  try {
    const response = await interceptor.post('/', ubicacion, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error al registrar una nueva ubicacion:', error);
    throw error;
  }
};

export const getAllUbicaciones = async () => {
  try {
    const response = await interceptor.get('/', {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error al obtener las ubicaciones:', error);
    throw error;
  }
};
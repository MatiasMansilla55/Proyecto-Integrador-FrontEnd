import axios from "axios";


const interceptor = axios.create({
  baseURL: "https://gotravel.up.railway.app/reservas"
});

export const getAllReservas = async () => {
  try {
    const response = await interceptor.get("/listar", {
        withCredentials: true
    });
    return response; //le saco el .data
  } catch (error) {
    console.error("Ocurrió un error al obtener las reservas", error);
    throw error;
  }
};

export const getAllMyReservas = async () => {
  try {
    const response = await interceptor.get("/mis-reservas", {
        withCredentials: true
    });
    return response; 
  } catch (error) {
    console.error("Ocurrió un error al obtener tus reservas", error);
    throw error;
  }
};

export const createReserva = async (reserva) => {
  try {
    const response = await interceptor.post("/registrar", reserva, {
      withCredentials: true
    });

    return response;
  } catch (error) {
    console.error("Ocurrió un error al crear una reserva", error);
    throw error;
  }
};




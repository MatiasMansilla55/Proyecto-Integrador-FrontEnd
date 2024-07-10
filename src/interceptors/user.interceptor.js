import axios from "axios";

const interceptor = axios.create({
    baseURL: 'https://gotravel.up.railway.app/usuarios',
    withCredentials: true,
  })


 export const getallusers = async() => {
   try{
    const response = await interceptor.get('/')
    return response.data
    }

   catch(error){
      console.error('Ocurrio un error al listar los usuarios',error);
    throw error;
  }
}


export const registerUser = async(user) => {
    try{ const response = await interceptor.post('/registrar',user)
        return response.data
    }
    catch(error){
     console.error('Ocurrio un error al crear el usuario', error);
     throw error;
    }
    
}

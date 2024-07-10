import axios from 'axios';

const interceptor = axios.create({
  baseURL: 'https://gotravel.up.railway.app/categorias',
  withCredentials: true,
});

export const getAllCategorias = async () => {
  try {
    const response = await interceptor.get('/listar');
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error al traer las categorias:', error);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await interceptor.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error al traer la categoria específica:', error);
    throw error;
  }
};

export const createCategoria = async (categoria) => {
  try {
    const response = await interceptor.post('/', categoria, {
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error al registrar una nueva categoria:', error);
    throw error;
  }
};

export const editCategoria = async (categoriaId, categoriaData) => {
  try {
    const response = await interceptor.put(`/${categoriaId}`, categoriaData, {
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error al editar la categoria:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCategoria = async (categoriaId) => {
  try {
    await interceptor.delete(`/${categoriaId}`, {
      withCredentials: true
    });
  } catch (error) {
    console.error('Ocurrió un error al eliminar la categoria:', error);
    throw error;
  }
};

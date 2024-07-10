import React, { useState, useEffect } from 'react';
import { getAllCategorias, createCategoria, deleteCategoria } from '../interceptors/categoria.interceptor';

const Categoria = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categorias, setCategorias] = useState([]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategoria = { nombre, descripcion };
      await createCategoria(newCategoria);
      alert('Categoría creada con éxito');
      setNombre('');
      setDescripcion('');
      fetchCategorias(); 
    } catch (error) {
      console.error('Ocurrió un error al registrar una nueva categoría:', error);
      alert('Error al crear la categoría. Intenta nuevamente.');
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await getAllCategorias();
      setCategorias(data);
      console.log('Categorías obtenidas:', data);
    } catch (error) {
      console.error('Ocurrió un error al obtener las categorías:', error);
      alert('Error al obtener las categorías. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const deleteCategoriaFunction = async (id) => {
    try {
      console.log('Intentando eliminar la categoría con id:', id);
      await deleteCategoria(id);
      alert('Categoría eliminada con éxito');
      setCategorias(categorias.filter(categoria => categoria.id !== id));
    } catch (error) {
      console.error('Ocurrió un error al eliminar una categoría:', error);
      alert('Error al eliminar la categoría. Intenta nuevamente.');
    }
  }

  return (
    <div className="modal fade" id="categoriaModal" tabIndex="-1" aria-labelledby="categoriaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="categoriaModalLabel">Categoría</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-custom-green">Crear</button>
            </form>
            <hr />
            <h5>Categorías Existentes</h5>
            <ul>
              {categorias.map((categoria) => (
                <li key={categoria.id}>{categoria.nombre} - {categoria.descripcion} <button type="button" className="btn btn-danger me-2" onClick={() => deleteCategoriaFunction(categoria.id)}>Eliminar</button></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categoria;

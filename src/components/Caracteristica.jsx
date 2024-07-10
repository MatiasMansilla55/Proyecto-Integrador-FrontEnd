import { useState, useEffect } from 'react';
import { getAllCaracteristicas, createCaracteristica } from '../interceptors/caracteristica.interceptor';

const Caracteristica = () => {
  const [nombre, setNombre] = useState('');
  const [icono, setIcono] = useState(''); 
  const [caracteristicas, setCaracteristicas] = useState([]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleIconoChange = (e) => {
    setIcono(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCaracteristica = { nombre, icono };
      await createCaracteristica(newCaracteristica);
      alert('Característica creada con éxito');
      setNombre('');
      setIcono('');
      fetchCaracteristicas();
    } catch (error) {
      console.error('Ocurrió un error al registrar una nueva característica:', error);
      alert('Error al crear la característica. Intenta nuevamente.');
    }
  };

  const fetchCaracteristicas = async () => {
    try {
      const data = await getAllCaracteristicas();
      setCaracteristicas(data);
    } catch (error) {
      console.error('Ocurrió un error al obtener las características:', error);
      alert('Error al obtener las características. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    fetchCaracteristicas();
  }, []);

  return (
    <div className="modal fade" id="caracteristicaModal" tabIndex="-1" aria-labelledby="caracteristicaModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="caracteristicaModalLabel">Característica</h5>
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
                <label htmlFor="icono" className="form-label">Icono</label>
                <input
                  type="text"
                  className="form-control"
                  id="icono"
                  value={icono}
                  onChange={handleIconoChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-custom-green">Crear</button>
            </form>
            <hr />
            <h5>Características Existentes</h5>
            <ul>
              {caracteristicas.map((caracteristica) => (
                <li key={caracteristica.id}>{caracteristica.nombre} - {caracteristica.icono}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caracteristica;

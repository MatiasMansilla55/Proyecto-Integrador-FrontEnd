import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/NavBar';
import { getAllMyReservas } from '../interceptors/reserva.interceptor';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('proximas'); 

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await getAllMyReservas();
        console.log('Reservas obtenidas:', response.data);
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener tus reservas', error);
        setError('Ocurrió un error al obtener tus reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const today = new Date().toISOString().split('T')[0];
  const reservasFiltradas = reservas.filter((reserva) => {
    if (filter === 'proximas') {
      return reserva.fechaInicio >= today;
    } else if (filter === 'pasadas') {
      return reserva.fechaFin < today;
    }
    return true;
  });

  return (
    <div>
      <CustomNavbar />
      <div className='favs-container container'>
        <div className="px-4 mt-3 mb-3">
          <h3 className="fs-1">Tus reservas</h3>
          <div className="text-green">Aquí separamos una lista con tus próximos destinos.</div>
          <div className="mt-3 ms-1 filter-links">
            <a 
              href="#"
              id='reservas-filtros'
              className={`me-4 ${filter === 'proximas' ? 'active-filter' : ''}`}
              onClick={() => handleFilterChange('proximas')}
            >
              Próximas
            </a>
            <a 
              href="#"
              id='reservas-filtros'
              className={`${filter === 'pasadas' ? 'active-filter' : ''}`}
              onClick={() => handleFilterChange('pasadas')}
            >
              Pasadas
            </a>
          </div>
        </div>
        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-green" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        )}
        {!loading && error && (
          <div className="text-center mt-4">
            <p>Error al cargar las reservas: {error}</p>
          </div>
        )}
        {!loading && !error && reservasFiltradas.length === 0 && (
          <div className="text-center mt-4">
            <p>No tienes reservas aún.</p>
          </div>
        )}
        {!loading && !error && reservasFiltradas.length > 0 && (
          <div className='favs-grid row container ms-0'>
            {reservasFiltradas.map(reserva => (
              <div key={reserva.id} className="col-12 mb-4">
                <div className="">
                  <div className="row g-0">
                    {reserva.productoSalidaDto.imagenes.length > 0 && (
                      <div className="col-md-3">
                        <img 
                          src={reserva.productoSalidaDto.imagenes[0].rutaDeArchivo} 
                          className="img-fluid rounded" 
                          alt={reserva.productoSalidaDto.nombre} 
                          style={{height:'180px'}}
                        />
                      </div>
                    )}
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                      <h5 className="card-title mb-0 mb-md-3 fw-semibold">{reserva.productoSalidaDto.nombre}</h5>
                      <p className="card-text mb-0 mb-md-3">Check in: <span className='lead text-green'>{reserva.fechaInicio}</span></p>
                      <p className="card-text">Precio por noche: <span className='lead text-green'>{reserva.productoSalidaDto.precioNoche} <span className="text-decoration-line-through">USD</span></span></p>
                    </div>
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                      <p className="card-text">Check out: <span className='lead text-green'>{reserva.fechaFin}</span></p>
                    </div>
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                      <p className="card-text">Capacidad: <span className='lead text-green'>{reserva.productoSalidaDto.capacidad}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservas;

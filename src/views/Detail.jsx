import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/NavBar';
import { getProductsById } from '../interceptors/product.interceptor';
import DetailDatePicker from '../components/DetailDatePicker';
import { createReserva } from '../interceptors/reserva.interceptor';
import { getUserFromCookie } from '../interceptors/auth.interceptor';
import { format } from 'date-fns';

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para controlar la visibilidad del modal de éxito
  const [user, setUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate(); // Hook para la navegación
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductsById(params.id);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setError('Ocurrió un error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserFromCookie();
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error al obtener usuario desde la cookie', error);
      }
    };
    fetchUser();
  }, []);

  const openGallery = (index) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Enlace copiado al portapapeles");
    });
  };

  const handleReserve = async (startDate, endDate) => {
    try {
      setIsReserving(true);
      if (!startDate || !endDate) {
        alert('Las fechas no pueden estar vacías');
        return;
      }

      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');

      if (isNaN(new Date(formattedStartDate)) || isNaN(new Date(formattedEndDate))) {
        alert('Formato de fecha inválido');
        return;
      }

      const reserva = {
        usuarioId: user.id,
        productoId: product.id,
        fechaInicio: formattedStartDate,
        fechaFin: formattedEndDate,
        estado: 'PENDIENTE'
      };

      await createReserva(reserva);
      setShowSuccessModal(true); // Mostrar el modal de éxito
    } catch (error) {
      console.error('Ocurrió un error al completar la reserva', error);
      alert('Ocurrió un error al completar la reserva');
    } finally {
      setIsReserving(false);
    }

  };

  return (
    <>
      <CustomNavbar />
      {!loading && !error && !product && (
        <div className="detail-container container py-3 py-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <p className='text-center fs-2 mt-4'>No hay producto</p>
              <a href="/" className='btn btn-custom-orange'>Volver</a>
            </div>
          </div>
        </div>
      )}

      {product && (
        <div className='detail-container container py-3 py-lg-5 ms-3'>
          <div className='row justify-content-center'>
            <div className='col-lg-6'>
              <h2 className='d-flex d-lg-none mb-4 ms-1'>{product?.nombre}</h2>
              {product?.imagenes && product.imagenes.length > 0 && (
                <img src={product.imagenes[selectedImageIndex].rutaDeArchivo} alt="Main Image" className="large-image img-fluid rounded mb-2" onClick={() => openGallery(0)} />
              )}
            </div>
            <div className='col-lg-2'>
              <div className="d-flex flex-row flex-lg-column">
                {product?.imagenes && product.imagenes.slice(1, 5).map((imagen, index) => (
                  <img key={index} src={imagen.rutaDeArchivo} alt={`Image ${index}`} className="smaller-image img-fluid rounded mb-2" onClick={() => openGallery(index + 1)} />
                ))}
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='d-flex flex-column'>
                <h2 className='d-none d-lg-flex'>{product?.nombre}</h2>
                <p>{product?.descripcion}</p>
                <p className="text-green">
                  <i className="bi bi-geo-alt-fill"></i> {product?.ubicacion?.pais}, {product?.ubicacion?.ciudad}, CP: {product?.ubicacion?.codigoPostal}
                </p>
                <p className="text-green"><i class="bi bi-people-fill"></i> {product?.capacidad} personas</p> 
                <p>${product?.precioNoche} <span className="text-green text-decoration-line-through">USD</span></p>
                  <div className="col-lg-8 col-10">
                  <DetailDatePicker onReserve={handleReserve} productId={product?.id} />
                  </div>
                  <div className="col-lg-8 col-10 mt-2 ms-1">
                    <button className='btn btn-custom-green w-100' onClick={handleShare}>
                      <i className="bi bi-share-fill"></i>
                    </button>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sector de políticas de producto */}
      <div className="container my-5">
        <h2 className="text-center mb-5 pb-3 border-bottom border-dark">Nuestras políticas</h2>
        <div className="row justify-content-center">
          <div className="col-lg-4 mb-2">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <h3 className="card-title">Cancelación</h3>
                <p className="card-text">Se requiere cancelar al menos 48 horas antes del check-in para obtener reembolso.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <h3 className="card-title">Mascotas</h3>
                <p className="card-text">No se permiten mascotas en las instalaciones en ningún caso.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <h3 className="card-title">Fumar</h3>
                <p className="card-text">Está prohibido fumar dentro de las habitaciones y áreas comunes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup de la galería */}
      {showGallery && (
        <div className="gallery-popup">
          <button className="close-btn" onClick={closeGallery}>Cerrar</button>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {product?.imagenes && product.imagenes.map((imagen, index) => (
                <div key={index} className={`carousel-item ${index === selectedImageIndex ? 'active' : ''}`}>
                  <img src={imagen.rutaDeArchivo} className="d-block w-100" alt={`Image ${index}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal para compartir */}
      {showShareModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row">
                  <div className="col-6">
                    {product?.imagenes && product.imagenes.length > 0 && (
                      <img src={product.imagenes[selectedImageIndex].rutaDeArchivo} alt="Main Image" className="img-fluid rounded mb-2" onClick={() => openGallery(0)} style={{maxWidth:'220px'}} />
                    )}
                  </div>
                  <div className="col-6">
                    <h2 className='ms-4'>{product?.nombre}</h2>
                    <p className='ms-4'>{product?.descripcion}</p>
                    <p className='ms-4'>${product?.precioNoche} <span className="text-green text-decoration-line-through">USD</span></p>
                  </div>
                </div>
              </div>
              <div className="modal-body text-center">
                <div className="d-flex justify-content-around mb-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-green">
                    <i className="bi bi-facebook fs-3" style={{ cursor: 'pointer' }}></i>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-green">
                    <i className="bi bi-twitter fs-3" style={{ cursor: 'pointer' }}></i>
                  </a>
                  <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-green">
                    <i className="bi bi-whatsapp fs-3" style={{ cursor: 'pointer' }}></i>
                  </a>
                  <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-green">
                    <i className="bi bi-envelope fs-3" style={{ cursor: 'pointer' }}></i>
                  </a>
                </div>
                <button className="btn btn-custom-green" onClick={copyLink}>
                  <i className="bi bi-clipboard"></i> Copiar enlace
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeShareModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reserva Completada</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSuccessModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Su reserva se ha completado con éxito.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSuccessModal(false)}>Cerrar</button>
                <button type="button" className="btn btn-custom-green" onClick={() => navigate('/reservas')}>Ver Reserva</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;

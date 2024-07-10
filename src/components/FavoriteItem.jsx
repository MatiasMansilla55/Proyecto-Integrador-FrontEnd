import React from 'react';
import { deleteFavorito } from '../interceptors/favorito.interceptor';

const FavoriteItem = ({ item, Onfavoritetoggle }) => {
  const { id, nombre } = item;

  const handleDeleteFavorite = async () => {
    try {
      await deleteFavorito(id);
      Onfavoritetoggle(id);
      alert("Tu producto se ha eliminado de favoritos");
    } catch (error) {
      console.error('Error al eliminar favorito', error);
    }
  };

  const primeraImagenURL = item.producto.imagenes.length > 0 ? item.producto.imagenes[0].rutaDeArchivo : 'default-image-url';

  return (
    <div className="row mb-3" style={{ width: '80vw' }}>
      <div className="col-md-3">
        <img
          src={primeraImagenURL}
          className="img-fluid rounded"
          alt={nombre}
          style={{ width: '240px', maxHeight: '180px', objectFit: 'cover' }}
        />
      </div>
      <div className="col-md-3 d-flex flex-column justify-content-center">
        <h5 className="card-title mb-2 fw-semibold">{item.producto.nombre}</h5>
        <p className="card-lead mb-2">{item.producto.descripcion}</p>
        <p className="text-green mb-1"><i className="bi bi-geo-alt"></i> {item.producto.ubicacion.pais || 'Desconocido'}</p>
        <div>
          <span className="fw-semibold fs-5">${item.producto.precioNoche}</span><span className="text-green text-decoration-line-through"> USD</span>
        </div>
      </div>
      <div className="col-md-3 d-flex flex-column justify-content-center">
        <p className="text-green"><i className="bi bi-people-fill"></i> {item.producto.capacidad} personas</p> 
        <div className="text-green mb-3">{item.producto.categorias[0].nombre}</div>
        <div className="text-green">{item.producto.caracteristicas[0].nombre}</div>
      </div>
      <div className="col-md-3 d-flex flex-column justify-content-center">
        <a href={`/detalles/${item.producto.id}`} className="btn btn-custom-green w-100 mt-2">Ir a reservar</a>
        <button className="btn btn-custom-green w-100 mt-2" onClick={handleDeleteFavorite}>Quitar de favoritos</button>
      </div>
    </div>
  );
};

export default FavoriteItem;

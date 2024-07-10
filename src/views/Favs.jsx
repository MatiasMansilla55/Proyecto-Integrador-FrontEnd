import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/NavBar';
import { getAllFavorits } from '../interceptors/favorito.interceptor';
import FavoriteItem from '../components/FavoriteItem'; 

const Favs = () => {
  const [favorites, setFavorite] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getAllFavorits();
        console.log('Fetched data:', data); 
        setFavorite(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error('Se presentó un error al cargar los favoritos', error);
        setFavorite([]); 
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteToggle = (id) => {
    setFavorite((prevFavorites) => prevFavorites.filter(fav => fav.id !== id));
  };

  return (
    <div>
      <CustomNavbar />
      <div className='favs-container container'>
      <div className="px-4 mt-3 mb-3">
          <h3 className="fs-1">Tus favoritos</h3>
          <div className="text-green">Aca separamos una lista con los destinos que mas te interesaron.</div>
        </div>
        <div className='favs-list row'>
          {Array.isArray(favorites) && favorites.length > 0 ? (
            favorites.map(item => (
              <div key={item.id} className="col-12 col-md-6 col-lg-3 mb-4 ms-4">
                <FavoriteItem item={item} Onfavoritetoggle={handleFavoriteToggle} />
              </div>
            ))
          ) : (
            <div className='text-center mt-4 mb-5'>
              <p className=''>No existen favoritos</p>
              <a href='/' className='btn btn-custom-green'>Agregar un producto</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favs;
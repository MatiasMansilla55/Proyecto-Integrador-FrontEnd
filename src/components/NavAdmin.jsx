import React, { useState } from 'react';
import LogoImage from '/Logo03.png';
import BgNavBar from '/pexels-tomfisk-1518723.jpg';
import { logoutUser } from '../interceptors/auth.interceptor';

function NavAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      setIsLoggedIn(false); 
    } catch (error) {
      console.error('Error al hacer logout:', error);
    } finally {
      window.location.reload(); 
    }
  };

  return (
    <div style={{ 
      backgroundImage: `url(${BgNavBar})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Contenedor para el logo y el texto */}
          <div className="d-flex align-items-center">
          <a className="navbar-brand text-white fw-semibold d-flex align-items-center mt-1" href="/">
              <img src={LogoImage} alt="Logo" style={{ width: '100px',height: '33px',marginRight:"10px"}} className='logoimage' /> 
              <span id='nav-title' className="nav-link text-custom-orange"></span> 
            </a>
          </div>

          <button className="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className='rounded-circle' src="https://dummyimage.com/40x40/000/fff" alt="perfil" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Perfil</a></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>      
    </div>
  );
}

export default NavAdmin;

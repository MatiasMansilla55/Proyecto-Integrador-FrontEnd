import React from 'react';
import LogoImage from '/Logo01.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-3" >
            <div className="d-flex align-items-center"style={{marginLeft:'-20px'}}>
            <img src={LogoImage} alt="Logo" style={{ width: '50px'}} />
            <h5 className='text-custom-orange mt-1' style={{marginRight:'-90px'}}>GOTravel</h5>
            </div>
            <p className='text-custom-orange'>Nuestro trabajo es inspirar y permitir hospedajes memorables para todos.</p>
          </div>  

          <div className="col-6 col-md-2 mb-3">
            <h5 className='text-custom-orange'>Acerca de</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-custom-orange-lead">Sobre nosotros</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-custom-orange-lead">Blog</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-custom-orange-lead">Carreras</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5 className='text-custom-orange'>Soporte</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-custom-orange-lead">Contáctanos</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-custom-orange-lead">FAQ</a></li>
            </ul>
          </div>

          <div className="col-10 col-md-3 ms-md-4 mb-3">
            <form>
              <h5 className="text-custom-orange">Recibir actualizaciones</h5>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Ingresa tu correo</label>
                <input id="newsletter1" type="text" className="form-control bg-secondary border-0" placeholder="Ingresa tu correo" />
                <button className="btn btn-custom-orange" type="button">Suscribirse</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-dark mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className='text-white'>&copy; 2024 GOTravel. Todos los derechos reservados</p>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled d-flex justify-content-center">
                <li className="ms-3"><a className="text-white" href="#">Política de privacidad</a></li>
                <li className="ms-3"><a className="text-white" href="#">Términos y condiciones</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

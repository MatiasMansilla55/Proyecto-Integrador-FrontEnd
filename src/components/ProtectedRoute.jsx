import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { hasAdminPermission } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); 

  useEffect(() => {
    const checkAdminPermission = async () => {
      const isAdmin = await hasAdminPermission();
      setIsAdmin(isAdmin);
    };
    
    const timeoutId = setTimeout(() => {
      checkAdminPermission();
    }, 150); //le doy poco tiempo para q se vea movimiento del spinner

    return () => clearTimeout(timeoutId);
  }, []);

  if (isAdmin === null) {
    return           <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
    <div className="spinner-border text-green" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/HomePage';
import AdminPage from '../views/AdminPage';
import Detail from '../views/Detail';
import CreateAcount from '../views/CreateAcount';
import Login from '../views/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import Favs from '../views/Favs';
import Reservas from '../views/Reservas';

const MainRouter = () => {

  const isLoggedIn = () => {
    return localStorage.getItem('user') !== null;
  };
  
  const RedirectIfLoggedIn = ({ children }) => {
    if (isLoggedIn()) {
      return <Navigate to="/" />;
    }
    return children;
  };

    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favoritos" 
          element={
            <ProtectedRoute>
              <Favs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reservas" 
          element={
            <ProtectedRoute>
              <Reservas />
            </ProtectedRoute>
          } 
        />
        <Route path="/detalles/:id" element={<Detail />} />
        <Route 
          path="/crearcuenta" 
          element={
            <RedirectIfLoggedIn>
              <CreateAcount />
            </RedirectIfLoggedIn>
          } 
        />
        <Route 
          path="/login" 
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          } 
        />
      <Route 
        path="/favoritos" 
        element={ 
        <ProtectedRoute>
          <Favs/>
        </ProtectedRoute>
        } />
      </Routes>
    );
  };

export default MainRouter;
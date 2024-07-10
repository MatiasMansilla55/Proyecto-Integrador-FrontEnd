import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllReservas } from '../interceptors/reserva.interceptor';
import { getUserFromCookie } from '../interceptors/auth.interceptor';

const DetailDatePicker = ({ onReserve, productId }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [user, setUser] = useState(null); 

  const today = new Date();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserFromCookie();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadReservas();
    }
  }, [user, productId]);

  const loadReservas = async () => {
    try {
      const response = await getAllReservas();
      setReservas(response.data);
    } catch (error) {
      console.error('Error al cargar las reservas', error);
    }
  };

  const handleReserve = async () => {
    if (!startDate || !endDate) {
      alert('Debe seleccionar fecha de entrada y salida');
      return;
    }

    if (!user) {
      const confirmLogin = window.confirm(
        'Para realizar una reserva, debes iniciar sesión. ¿Quieres iniciar sesión ahora?'
      );
      if (confirmLogin) {
        window.location.replace('/login');
      }
      return;
    }

    onReserve(startDate, endDate);
  };

  const isDateOccupied = (date, productId) => {
    return reservas.some((reserva) => {
      if (reserva.productoSalidaDto.id === productId) {
        const reservaStartDate = new Date(reserva.fechaInicio);
        const reservaEndDate = new Date(reserva.fechaFin);
        return date >= reservaStartDate && date <= reservaEndDate;
      }
      return false;
    });
  };

  return (
    <div className="date-range-picker row">
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <label htmlFor="startDate" className="form-label"></label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={today}
          filterDate={(date) => !isDateOccupied(date, productId)}
          className="form-control date-picker-check-in p-2 ms-0 ms-md-2 mb-2 mb-md-0"
          placeholderText="Check-in"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <label htmlFor="endDate" className="form-label"></label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || today}
          filterDate={(date) => !isDateOccupied(date, productId)}
          className="form-control date-picker-check-out p-2"
          placeholderText="Check-out"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="col-12 d-flex align-items-center justify-content-center mt-2 ms-1">
        <button className="btn btn-custom-orange w-100" onClick={handleReserve}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default DetailDatePicker;

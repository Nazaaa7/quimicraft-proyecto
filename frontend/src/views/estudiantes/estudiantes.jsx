// src/views/Estudiantes.jsx
import './estudiantes.css'
import React, { useContext } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import Categories from './categories';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción
import Sidebar from './sideBar';

function Estudiantes() {
  const { stateDispatch } = useContext(UserContext); // Accede al dispatch


  const logOut = () => {
    // Limpia el localStorage antes de la actualización de estado
    localStorage.removeItem("userData");

    // Actualiza el estado para reflejar el cierre de sesión
    stateDispatch({
      type: userType.logOut,
    });

    // Si es necesario, redirige al usuario a la pantalla de login
    window.location.href = "/"; // O usa navigate("/")
  };
  <button onClick={logOut} className='logOut'>Cerrar Sesión</button>


  return (
    <div className='App'>
      <Sidebar />
    <div>
    <Navbar />
    <Banner />
    <Categories />

    
      </div>

    </div>
  );
}

export default Estudiantes;
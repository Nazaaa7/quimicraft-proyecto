import './estudiantes.css';
import React, { useContext, useState } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import Categories from './categories';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción
import Sidebar from './sideBar'; 

function Estudiantes() {
  const { stateDispatch } = useContext(UserContext); // Accede al dispatch

  const logOut = () => {
    localStorage.removeItem("userData"); // Limpia el localStorage
    stateDispatch({
      type: userType.logOut,
    });
    window.location.href = "/"; // Redirige al login
  };

 

  return (
    <div className='App'>
      <Sidebar/> {/* Sidebar controlada por el estado */}
      <div>
      <Navbar  /> 
        <Banner />
        <Categories />
       
      </div>
    </div>
  );
}

export default Estudiantes;

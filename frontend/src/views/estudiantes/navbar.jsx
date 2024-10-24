import React, { useContext, useState } from 'react';
import './assets/css/navbar.css';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción

function Navbar({ toggleSidebar }) {
  const { stateDispatch } = useContext(UserContext); // Accede al dispatch

  const logOut = () => {
    localStorage.removeItem("userData"); // Limpia el localStorage
    stateDispatch({
      type: userType.logOut,
    });
    window.location.href = "/"; // Redirige al login
  };

  return (
    <nav className="navbar">
      <h1>QuimiCraft</h1>
      
      
      <button onClick={logOut} className="logOut">Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;

import React, { useContext } from 'react';
import './assets/css/navbar.css';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción

function Navbar({ setActiveForo }) { // Recibe la función para cambiar el foro activo
  const { stateDispatch } = useContext(UserContext); // Accede al dispatch

  const logOut = () => {
    localStorage.removeItem("userData");
    stateDispatch({
      type: userType.logOut,
    });
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h1>QuimiCraft</h1>
      <ul className="nav-links">
        <li onClick={() => setActiveForo('profesores')}>Profesores</li>
        <li onClick={() => setActiveForo('estudiantes')}>Estudiantes</li>
      </ul>
      <button onClick={logOut} className='logOut'>Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;

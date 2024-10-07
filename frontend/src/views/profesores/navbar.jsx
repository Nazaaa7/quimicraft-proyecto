// Navbar.jsx
import React, { useContext } from 'react';
import './assets/css/navbar.css';
import { UserContext } from '../../context/UserContext';
import { userType } from '../../context/userTypes';

function Navbar({ setActiveForo }) {
  const { stateDispatch } = useContext(UserContext);

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
        <li onClick={() => setActiveForo('profesores')}>Publicaciones</li>
        <li onClick={() => setActiveForo('consultas')}>Consultas</li>
        <li>Subir archivos</li>
      </ul>
      <button onClick={logOut} className='logOut'>Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;

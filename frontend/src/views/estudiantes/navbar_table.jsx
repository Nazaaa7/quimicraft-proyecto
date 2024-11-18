import React from 'react';
import './assets/css/navbar.css';

function Navbar({ toggleSidebar }) {

  const goBack = () => {
    window.history.back(); // Navega hacia atrás en el historial del navegador
  };

  return (
    <nav className="navbar">
      <h1>QuimiCraft</h1>
      
      <button onClick={goBack} className="logOut">Volver</button>
    </nav>
  );
}

export default Navbar;

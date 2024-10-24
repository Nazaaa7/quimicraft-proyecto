// src/views/Estudiantes.jsx
import React, { useContext } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción
import Publicaciones from './publicaciones';

function Admin() {
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
 

  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Publicaciones/>
    </div>
  );
}

export default Admin;

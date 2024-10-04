// src/views/Estudiantes.jsx
import React, { useContext, useState } from 'react'; // Asegúrate de importar useState
import Navbar from './navbar';
import Banner from './banner';
import ForoProfesores from '../foroAdmin/foroProf'; // Cambia el nombre según lo que hayas definido
import ForoEstudiantes from '../foroAdmin/foro'; // Cambia el nombre según lo que hayas definido
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción

function Admin() {
  const { stateDispatch } = useContext(UserContext); // Accede al dispatch
  const [activeForo, setActiveForo] = useState(''); // Estado para el foro activo

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
      <div>
<<<<<<< HEAD

=======
>>>>>>> ed5289ab22ded5f054ab4348f9d7ee95de5c86e4
      <Navbar setActiveForo={setActiveForo} /> {/* Pasamos la función para cambiar el foro activo */}
      <Banner />

      {/* Mostramos el foro correspondiente según el valor de activeForo */}
      {activeForo === 'profesores' && <ForoProfesores />}
      {activeForo === 'estudiantes' && <ForoEstudiantes />}
      
      </div>
    </div>
  );
}

export default Admin;

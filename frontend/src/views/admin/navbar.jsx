import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción
import { LogOut } from 'lucide-react'; // Importa el ícono para el botón de cerrar sesión
import { Link } from 'react-router-dom';

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
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-md">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold tracking-wide">QuimiCraft</h1>
      </div>

      <ul className="flex items-center justify-center  space-x-6">
        {/* Enlace sin subrayado y con verde oscuro */}
        <li 
          onClick={() => setActiveForo('profesores')}
          className="text-lg font-semibold cursor-pointer hover:text-green-600 transition duration-300"
        >
          <Link to="/userView" className="block no-underline text-green-700 hover:text-green-800">Carga de usuarios</Link>
        </li>

        <li 
          onClick={() => setActiveForo('estudiantes')}
          className="text-lg font-semibold cursor-pointer hover:text-green-600 transition duration-300"
        >
          <Link to="/foroList" className="block no-underline text-green-700 hover:text-green-800">Control de foro</Link>
        </li>

        <li 
          className="text-lg font-semibold cursor-pointer hover:text-green-600 transition duration-300"
        >
          <Link to="/vista" className="block no-underline text-green-700 hover:text-green-800">Control de material</Link>
        </li>
      </ul>

      <button
        onClick={logOut}
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </button>
    </nav>
  );
}

export default Navbar;

// Navbar.jsx
import React, { useContext } from 'react';
import './assets/css/navbar.css';
import { UserContext } from '../../context/UserContext';
import SidebarItem from './navarItems';
import { userType } from '../../context/userTypes';
import { Link } from 'react-router-dom';


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
      <div className="navbar-content">
        <Link to='/materiales' className="tak">
          <SidebarItem text="Subir archivos" />
        </Link>
        <button onClick={logOut} className='logOut'>Cerrar Sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;

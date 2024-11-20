// Estudiantes.js
import './estudiantes.css';
import React, { useContext } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import { UserContext } from '../../context/UserContext';
import { userType } from '../../context/userTypes';
import Sidebar from './sideBar';
import { Link } from 'react-router-dom';


function Estudiantes() {
  const { stateDispatch } = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem("userData");
    stateDispatch({
      type: userType.logOut,
    });
    window.location.href = "/";
  };

  return (
    <div className='app-container'>
      <Navbar />
      <div className='content-wrapper'>
        <Sidebar />
          <Banner />
        </div>
      </div>
  );
}


export default Estudiantes;
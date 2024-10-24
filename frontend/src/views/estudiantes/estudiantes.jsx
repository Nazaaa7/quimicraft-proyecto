// Estudiantes.js
import './estudiantes.css';
import React, { useContext } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import Categories from './categories';
import { UserContext } from '../../context/UserContext';
import { userType } from '../../context/userTypes';
import Sidebar from './sideBar';

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
        <div className='main-content'>
          <Banner />
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default Estudiantes;
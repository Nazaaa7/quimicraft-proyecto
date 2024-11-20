import React from 'react';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { userType } from "../../context/userTypes";
import { LogOut, Leaf } from "lucide-react";

function Navbar() {
  const { stateDispatch } = useContext(UserContext);

  const goBack = () => {
    window.history.back(); // Navega hacia atrás en el historial del navegador
  };


  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-md">
      <div className="flex items-center space-x-3">
        <Leaf className="text-green-600" size={28} />
        <h1 className="text-2xl font-bold tracking-wide flex items-center">
          QuimiCraft
        </h1>
      </div>
      
      <button
        onClick={goBack}
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        <LogOut size={20} />
        <span>volver</span>
      </button>
    </nav>
  );
}

export default Navbar;

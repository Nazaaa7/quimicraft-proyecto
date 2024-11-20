import React from 'react';
import bannerImage from '/img/banner.png';
import { Link } from "react-router-dom";


function Banner() {
  return (
    <div className="bg-green-50 py-3 px-6 w-full h-full pb-10 flex items-center justify-between">
      <div className="max-w-xl space-y-5">
        <h2 className="text-4xl font-bold text-green-800 tracking-tight">
          QuimiCraft
        </h2>
        <p className="text-green-700 text-lg leading-relaxed">
          QuimiCraft es una plataforma interactiva orientada al fácil aprendizaje de la química con diferentes métodos y opciones para ayudarte con el proceso didáctico.
        </p>
        <div className="flex space-x-4">
        <Link to="/material">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            Comenzar
          </button>
        </Link>
        </div>
      </div>
      <img 
        src={bannerImage} 
        alt="Banner" 
        className="max-w-md w-4/12 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" 
      />
    </div>
  );
}

export default Banner;
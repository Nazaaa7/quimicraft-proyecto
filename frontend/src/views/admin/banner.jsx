import React from 'react';
import bannerImage from '/img/banner.png'; // Cambia la ruta según tu estructura de archivos

function Banner() {
  return (
    <div className="py-20 px-6">
      {/* Contenedor del texto */}
      <div className="container mx-auto flex items-center justify-between flex-col w-full lg:flex-row">
        <div className="text-center lg:text-left text-green-900 space-y-4 w-full">
          <h2 className="text-4xl font-extrabold text-green-800 leading-tight">
            Bienvenido, Administrador de QuimiCraft
          </h2>
          <p className="text-lg font-medium text-green-700">
            Como administrador de <b>QuimiCraft</b>, tendrás la responsabilidad de gestionar la plataforma y asegurar que los usuarios tengan una experiencia de aprendizaje interactiva y eficiente. 
            Desde esta sección, podrás gestionar el acceso a los foros, controlar el material disponible y cargar nuevos usuarios, entre otras tareas clave.
          </p>
          <p className="text-lg font-medium text-green-700">
            Tu rol es fundamental para mantener el orden y la funcionalidad de la plataforma, asegurando que cada sección sea accesible y funcional para los estudiantes y profesores.
          </p>
          <p className="text-lg font-medium text-green-700">
            Usa las herramientas disponibles en el panel de administración para supervisar y mejorar continuamente la experiencia educativa de <b>QuimiCraft.</b>
          </p>
        </div>
        {/* Imagen del banner */}
        <div className="mt-8 lg:mt-0">
          <img src={bannerImage} alt="Banner" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}

export default Banner;

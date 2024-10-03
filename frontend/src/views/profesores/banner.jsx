import React, { useState } from 'react';
import './assets/css/banner.css';
import bannerImage from '/img/banner.png'; // Cambia la ruta según tu estructura de archivos

function Banner({ onNewPost }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contenido, setContenido] = useState('');

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contenido.trim()) {
      // Crear un nuevo post y llamarlo desde el componente padre (Estudiantes.jsx)
      onNewPost({
        id: Date.now(), // Genera un id único basado en la marca de tiempo
        userId: 8, // ID del usuario actual, puedes adaptarlo según sea necesario
        text: contenido,
        likes: [],
        replies: []
      });
      // Limpiar los campos del formulario
      setContenido('');
      toggleFormulario();
    }
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h2>QuimiCraft</h2>
        <p>QuimiCraft es una plataforma interactiva orientada al fácil aprendizaje de la química con diferentes métodos y opciones para ayudarte con el proceso didáctico.</p>
        <button className='post' onClick={toggleFormulario}>Nuevo post</button>
      </div>
      <img src={bannerImage} alt="Banner" className="banner-image" />

      {mostrarFormulario && (
        <>
          <div className="overlay" onClick={toggleFormulario}></div>
          <div className="formulario-post">
            <h3>Crear nuevo post</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Contenido:
                <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} placeholder="Escribe tu publicación"></textarea>
              </label>
              <button type="submit">Publicar</button>
              <button type="button" onClick={toggleFormulario}>Cerrar</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;

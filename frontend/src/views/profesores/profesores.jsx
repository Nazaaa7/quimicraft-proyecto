import React, { useContext, useState } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import ForoProf from '../foro/foroProf';
import { UserContext } from '../../context/UserContext';
import { userType } from '../../context/userTypes';

const initialComments = [
  { id: 1, userId: 1, text: 'La química orgánica es fundamental para entender cómo se estructuran y comportan las moléculas en nuestro entorno.', likes: [], replies: [] },
  { id: 2, userId: 2, text: 'Me encanta estudiar la termodinámica y cómo se relaciona con la energía en las reacciones químicas.', likes: [], replies: [] },
  { id: 3, userId: 3, text: 'Gran trabajo al abordar la química inorgánica.', likes: [], replies: [] },
  { id: 4, userId: 4, text: 'La termodinamica funciona para hacer que las redes de rayos uv desaparezan.', likes: [], replies: [] },
];

function Profesor() {
  const { stateDispatch } = useContext(UserContext);
  const [activeForo, setActiveForo] = useState(''); // Inicialmente vacío para que no se muestre nada
  const [comments, setComments] = useState(initialComments); // Inicializa con los comentarios preexistentes

  // Función para agregar nuevos comentarios
  const handleNewPost = (newPost) => {
    setComments((prevComments) => [newPost, ...prevComments]); // Agrega el nuevo post al inicio del array
  };

  // Función para agregar una respuesta a un comentario específico
  const handleReply = (commentId, replyText) => {
    setComments((prevComments) =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, { id: new Date().getTime(), userId: 1, text: replyText }],
            }
          : comment
      )
    );
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    stateDispatch({
      type: userType.logOut,
    });
    window.location.href = "/";
  };

  return (
    <div className="App">
<<<<<<< HEAD
    <div>
=======
      <div>
>>>>>>> ed5289ab22ded5f054ab4348f9d7ee95de5c86e4

      <Navbar setActiveForo={setActiveForo} /> {/* Pasamos la función para actualizar la sección activa */}
      <Banner onNewPost={handleNewPost} /> {/* Pasamos la función para agregar nuevos posts */}
      {/* Mostramos el foro correspondiente según el valor de activeForo */}
      {activeForo === 'profesores' ? (
        <ForoProf comments={comments} onReply={handleReply} /> // Pasamos la función de respuesta como prop a ForoProf
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Selecciona "Publicaciones" para ver las publicaciones.</p>
      )}
      </div>
<<<<<<< HEAD
=======

>>>>>>> ed5289ab22ded5f054ab4348f9d7ee95de5c86e4
    </div>
  );
}

export default Profesor;

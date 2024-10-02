// src/views/Estudiantes.jsx
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
    // Agrega aquí otros posts existentes
];

function Admin() {
    const { stateDispatch } = useContext(UserContext);
    const [activeForo, setActiveForo] = useState('');
    const [comments, setComments] = useState(initialComments); // Inicializa con los comentarios preexistentes

    const handleNewPost = (newPost) => {
        setComments(prevComments => [newPost, ...prevComments]); // Agrega el nuevo post al inicio del array
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
            <Navbar setActiveForo={setActiveForo} />
            <Banner onNewPost={handleNewPost} />
            
            {/* Mostramos el foro correspondiente según el valor de activeForo */}
            {activeForo === 'profesores' && <ForoProf comments={comments} />} {/* Pasa los comentarios a ForoProf */}
        </div>
    );
}

export default Admin;

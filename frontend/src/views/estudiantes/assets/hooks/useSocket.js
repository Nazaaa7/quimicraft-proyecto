// src/hooks/useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
    const socket = io(url);

    useEffect(() => {
        console.log('Conectado a WebSocket:', url);

        return () => {
            socket.disconnect();
            console.log('Desconectado de WebSocket:', url);
        };
    }, [url]);

    return socket;
};

export default useSocket;

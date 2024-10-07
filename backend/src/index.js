// Requerimos las dependencias usando `import` en lugar de `require`.
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./routes/auth.routes.js";
import { publicacionesRouter } from "./routes/publicaciones.routes.js";
import http from 'http'; // Cambiamos `require` a `import`
import { Server } from 'socket.io'; // Cambiamos `require` a `import`

// Inicializamos express.
const app = express();
const server = http.createServer(app);

// Socket.io para manejar el tiempo real
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Dirección del frontend (Vite)
    methods: ["GET", "POST"]
  }
});

// Aplicamos los middlewares.
app.use(cors()); // cors para que nos permita realizar peticiones desde cualquier cliente.
app.use(morgan("dev")); // morgan para mostrar informacion acerca de las peticiones que llegan a nuestro servidor.
app.use(express.json()); // express.json para que nuestro servidor pueda reconocer los json que recibimos por el body.

// Requerimos nuestras rutas.
app.use(userRouter);
app.use(publicacionesRouter);

// Configuramos el socket.io para manejo en tiempo real.
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Recibir mensajes del cliente y reenviarlos a todos los conectados
  socket.on('sendMessage', (messageData) => {
    io.emit('receiveMessage', messageData); // Enviar a todos los usuarios conectados
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Configuramos el puerto al que escuchara nuestro servidor.
server.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

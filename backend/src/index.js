// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./routes/auth.routes.js";
import { publicacionesRouter } from "./routes/publicaciones.routes.js";
import http from 'http'; 
import { Server } from 'socket.io'; 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(userRouter);
app.use(publicacionesRouter);

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Recibir mensajes del cliente y reenviarlos a todos los conectados
  socket.on('sendMessage', (messageData) => {
    console.log('Mensaje recibido:', messageData); // Log para ver el mensaje recibido
    io.emit('receiveMessage', messageData); // Enviar a todos los usuarios conectados
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

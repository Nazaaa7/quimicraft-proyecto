// routes/likeRoutes.js
import express from 'express';
import { 
  addLike, 
  removeLike, 
  getLikesCount,
  getUserLikes  // Nuevo controlador
} from '../controllers/like.controller.js';

const LikeRouter = express.Router();

// Rutas existentes
LikeRouter.get('/:post_id/likes_count', getLikesCount);
LikeRouter.post("/", addLike);
LikeRouter.delete("/", removeLike);

// Nueva ruta para obtener likes de un usuario
LikeRouter.get('/user/:user_id', getUserLikes);

export default LikeRouter;
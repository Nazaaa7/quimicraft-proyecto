// routes/commentRoutes.js
import express from 'express';
import { getCommentsByPost, createPostComment } from '../controllers/comment.controller.js';

const router = express.Router();

// Obtener los comentarios de una publicación
router.get('/post', getCommentsByPost);

// Crear un nuevo comentario
router.post('/post/:id', createPostComment);

export default router;

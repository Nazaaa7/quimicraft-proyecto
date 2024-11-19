import express from 'express';
import { getCommentsByPost, createPostComment, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

// Obtener los comentarios de una publicación
router.get('/post', getCommentsByPost);

// Crear un nuevo comentario
router.post('/new', createPostComment);

// Eliminar un comentario
router.delete('/:commentId', deleteComment);  // Ruta para eliminar un comentario

export default router;

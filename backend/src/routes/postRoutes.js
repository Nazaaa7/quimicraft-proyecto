// routes/postRoutes.js
import express from 'express';
import { getPosts, createPost, getCategories, deletePost } from '../controllers/foro.controller.js';

const router = express.Router();

// Obtener todas las publicaciones
router.get('/', getPosts);

router.get('/categories', getCategories);

// Crear una nueva publicación
router.post('/cargar', createPost);

router.delete("/eliminar/:postId", deletePost);


export default router;

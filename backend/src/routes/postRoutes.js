// routes/postRoutes.js
import express from 'express';
import { getPosts, createPost, getCategories } from '../controllers/foro.controller.js';

const router = express.Router();

// Obtener todas las publicaciones
router.get('/', getPosts);

router.get('/categories', getCategories);


// Crear una nueva publicación
router.post('/cargar', createPost);

export default router;

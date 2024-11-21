// backend/routes/admin.js
import express from 'express';
import { getEstudiantes, getProfesores, deleteEstudiante, deleteProfesor, createEstudiante, createProfesor, updateEstudiante, updateProfesor } from '../controllers/user.controller.js';

const adminUsRouter = express.Router();

// Rutas para obtener usuarios
adminUsRouter.get('/estudiante', getEstudiantes); // Obtiene todos los estudiantes
adminUsRouter.get('/profesor', getProfesores);   // Obtiene todos los profesores

// Rutas para eliminar usuarios
adminUsRouter.delete('/estudiante/:id', deleteEstudiante); // Elimina un estudiante por ID
adminUsRouter.delete('/profesor/:id', deleteProfesor);   // Elimina un profesor por ID

// Rutas para crear usuarios
adminUsRouter.post('/estudiante', createEstudiante); // Crea un nuevo estudiante
adminUsRouter.post('/profesor', createProfesor);    // Crea un nuevo profesor

// Rutas para actualizar usuarios
adminUsRouter.put('/estudiante/:id', updateEstudiante); // Edita un estudiante por ID
adminUsRouter.put('/profesor/:id', updateProfesor);    // Edita un profesor por ID

export default adminUsRouter;

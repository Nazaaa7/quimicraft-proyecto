// backend/controllers/adminController.js
import { connectDB } from '../db/database.js';

// Obtener estudiantes
export const getEstudiantes = async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM estudiante');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).send('Error al obtener estudiantes');
  }
};

// Obtener profesores
export const getProfesores = async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM profesor');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    res.status(500).send('Error al obtener profesores');
  }
};

// Eliminar estudiante
export const deleteEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectDB();
    await connection.execute('DELETE FROM estudiante WHERE id_estudiante = ?', [id]);
    res.status(200).json('Estudiante eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).send('Error al eliminar estudiante');
  }
};

// Eliminar profesor
export const deleteProfesor = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectDB();
    await connection.execute('DELETE FROM profesor WHERE id_profesor = ?', [id]);
    res.status(200).json('Profesor eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar profesor:', error);
    res.status(500).send('Error al eliminar profesor');
  }
};
// Crear estudiante
export const createEstudiante = async (req, res) => {
    const { nombre, apellido, correo, fecha_nacimiento, dni } = req.body;
    try {
      const connection = await connectDB();
      const [result] = await connection.execute(
        'INSERT INTO estudiante (nombre, apellido, correo, fecha_nacimiento, dni) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, correo, fecha_nacimiento, dni]
      );
      
      // Obtener el ID del nuevo estudiante
      const nuevoEstudianteId = result.insertId;
      
      // Recuperar los datos completos del nuevo estudiante
      const [nuevosEstudiantes] = await connection.execute(
        'SELECT * FROM estudiante WHERE id_estudiante = ?',
        [nuevoEstudianteId]
      );
      
      res.status(201).json(nuevosEstudiantes[0]);
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      res.status(500).json({ mensaje: 'Error al crear estudiante' });
    }
  };
  
  // Crear profesor
  export const createProfesor = async (req, res) => {
    const { nombre, apellido, correo, dni } = req.body;
    try {
      const connection = await connectDB();
      const [result] = await connection.execute(
        'INSERT INTO profesor (nombre, apellido, correo, dni) VALUES (?, ?, ?, ?)',
        [nombre, apellido, correo, dni]
      );
      
      // Obtener el ID del nuevo profesor
      const nuevoProfesorId = result.insertId;
      
      // Recuperar los datos completos del nuevo profesor
      const [nuevosProfesores] = await connection.execute(
        'SELECT * FROM profesor WHERE id_profesor = ?',
        [nuevoProfesorId]
      );
      
      res.status(201).json(nuevosProfesores[0]);
    } catch (error) {
      console.error('Error al crear profesor:', error);
      res.status(500).json({ mensaje: 'Error al crear profesor' });
    }
  };
  
  // Actualizar estudiante
  export const updateEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, fecha_nacimiento, dni } = req.body;
    try {
      const connection = await connectDB();
      await connection.execute(
        'UPDATE estudiante SET nombre = ?, apellido = ?, correo = ?, fecha_nacimiento = ?, dni = ? WHERE id_estudiante = ?',
        [nombre, apellido, correo, fecha_nacimiento, dni, id]
      );
      
      // Recuperar los datos actualizados del estudiante
      const [estudiantesActualizados] = await connection.execute(
        'SELECT * FROM estudiante WHERE id_estudiante = ?',
        [id]
      );
      
      res.status(200).json(estudiantesActualizados[0]);
    } catch (error) {
      console.error('Error al actualizar estudiante:', error);
      res.status(500).json({ mensaje: 'Error al actualizar estudiante' });
    }
  };
  
  // Actualizar profesor
  export const updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, dni } = req.body;
    try {
      const connection = await connectDB();
      await connection.execute(
        'UPDATE profesor SET nombre = ?, apellido = ?, correo = ?, dni = ? WHERE id_profesor = ?',
        [nombre, apellido, correo, dni, id]
      );
      
      // Recuperar los datos actualizados del profesor
      const [profesoresActualizados] = await connection.execute(
        'SELECT * FROM profesor WHERE id_profesor = ?',
        [id]
      );
      
      res.status(200).json(profesoresActualizados[0]);
    } catch (error) {
      console.error('Error al actualizar profesor:', error);
      res.status(500).json({ mensaje: 'Error al actualizar profesor' });
    }
  };
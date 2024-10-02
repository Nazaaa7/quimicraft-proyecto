import { connectDB } from "../db/database.js";
import { validarJWT } from "../helpers/validarJWT.js";

// Obtener todas las publicaciones
export const getPublicaciones = async (req, res) => {
  // Obtener el token desde los encabezados
  const token = req.headers.token;

  // Verifica si el token está presente
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Validar el token
  const usuario = await validarJWT(token);
  
  // Verifica si el token es válido
  if (!usuario) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  try {
    const connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM publicaciones');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
};

// Controlador para eliminar una publicación
export const deletePublicacion = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.token;

  // Verifica si el token está presente
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Validar el token
  const usuario = await validarJWT(token);
  
  // Verifica si el token es válido
  if (!usuario) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  try {
    const connection = await connectDB();
    await connection.query('DELETE FROM publicaciones WHERE id = ?', [id]);
    res.json({ message: 'Publicación eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la publicación' });
  }
};

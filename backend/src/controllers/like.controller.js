import { connectDB } from "../db/database.js";

export const getLikesCount = async (req, res) => {
    const { post_id } = req.params;
    try {
      const connection = await connectDB(); // Conectar a la base de datos
      const [rows] = await connection.execute(
        "SELECT COUNT(*) as likes_count FROM post_likes WHERE post_id = ?",
        [post_id]
      );
      res.set('Cache-Control', 'no-store'); // Desactivar caché en esta respuesta
      res.json({ likes_count: rows[0].likes_count }); // Enviar el contador de likes
      connection.end(); // Cerrar la conexión
    } catch (error) {
      console.error("Error al obtener el contador de likes:", error);
      res.status(500).json({ message: "Error al obtener el contador de likes" });
    }
  };

  export const addLike = async (req, res) => {
    const { post_id, user_id } = req.body;
    try {
      const connection = await connectDB();
      const [result] = await connection.execute(
        "INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)",
        [post_id, user_id]
      );
      res.status(201).json({ message: "Like agregado", like_id: result.insertId });
      connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al agregar el like" });
    }
  };
  
  // ... tus otros controladores existentes ...
  
  // Nuevo controlador para obtener los likes de un usuario
  export const getUserLikes = async (req, res) => {
    const { user_id } = req.params;
    try {
      const connection = await connectDB();
      
      // Obtener todos los post_ids que el usuario ha dado like
      const [rows] = await connection.execute(
        "SELECT post_id FROM post_likes WHERE user_id = ?",
        [user_id]
      );
      
      connection.end();
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error al obtener los likes del usuario:", error);
      res.status(500).json({ message: "Error al obtener los likes del usuario" });
    }
  };
  
  // También sería bueno agregar una función para verificar si un usuario ya dio like a un post
  export const checkUserLike = async (req, res) => {
    const { post_id, user_id } = req.params;
    try {
      const connection = await connectDB();
      
      const [rows] = await connection.execute(
        "SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?",
        [post_id, user_id]
      );
      
      connection.end();
      res.status(200).json({ hasLiked: rows.length > 0 });
    } catch (error) {
      console.error("Error al verificar el like del usuario:", error);
      res.status(500).json({ message: "Error al verificar el like" });
    }
  };
  
  export const removeLike = async (req, res) => {
    const { post_id, user_id } = req.body;
    try {
      const connection = await connectDB();
      
      const [result] = await connection.execute(
        "DELETE FROM post_likes WHERE post_id = ? AND user_id = ?",
        [post_id, user_id]
      );
      
      if (result.affectedRows === 0) {
        connection.end();
        return res.status(404).json({ message: "Like no encontrado" });
      }
      
      res.status(200).json({ message: "Like eliminado" });
      connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el like" });
    }
  };
  
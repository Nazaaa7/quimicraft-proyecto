// controllers/commentController.js
import { connectDB } from "../db/database.js";

// Obtener los comentarios de una publicación
const getCommentsByPost = async (req, res) => {
  const { post_id } = req.query;
  try {
    const connection = await connectDB();
    const [comments] = await connection.execute(
      `SELECT c.comment_id, c.content, c.created_at, u.usuario FROM post_comments c
       JOIN usuarios u ON c.user_id = u.id
       WHERE c.post_id = ?`,
      [post_id]
    );
    res.json(comments);
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los comentarios" });
  }
};

// Crear un comentario en una publicación
const createPostComment = async (req, res) => {
  const { post_id, user_id, content } = req.body;
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      "INSERT INTO post_comments (post_id, user_id, content) VALUES (?, ?, ?)",
      [post_id, user_id, content]
    );
    res.status(201).json({ message: "Comentario creado", comment_id: result.insertId });
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario" });
  }
};

export { getCommentsByPost, createPostComment };

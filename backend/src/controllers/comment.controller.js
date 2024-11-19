import { connectDB } from "../db/database.js";

// Obtener los comentarios de una publicación
const getCommentsByPost = async (req, res) => {
  const { post_id } = req.query;
  try {
    const connection = await connectDB();
    const [comments] = await connection.execute(
      `SELECT c.comment_id, c.content, c.created_at, u.usuario, u.id FROM post_comments c
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

// Crear un nuevo comentario
const createPostComment = async (req, res) => {
  const { post_id, user_id, content } = req.body;

  if (!post_id || !user_id || !content) {
    return res.status(400).json({ message: "Faltan datos requeridos (post_id, user_id, content)" });
  }

  try {
    const connection = await connectDB();

    const [result] = await connection.execute(
      "INSERT INTO post_comments (post_id, user_id, content) VALUES (?, ?, ?)",
      [post_id, user_id, content]
    );

    res.status(201).json({
      message: "Comentario creado",
      comment_id: result.insertId,
    });

    connection.end();
  } catch (error) {
    console.error("Error al crear el comentario:", error.message);
    res.status(500).json({ message: "Error al crear el comentario", error: error.message });
  }
};

// Eliminar un comentario
const deleteComment = async (req, res) => {
  const { commentId } = req.params;  // Obtener el commentId desde los parámetros de la URL

  try {
    const connection = await connectDB();

    // Realizar la consulta para eliminar el comentario
    const [result] = await connection.execute(
      "DELETE FROM post_comments WHERE comment_id = ?",
      [commentId]
    );

    // Verificar si se eliminó un comentario
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    // Enviar una respuesta exitosa
    res.status(200).json({ message: "Comentario eliminado exitosamente" });

    connection.end();
  } catch (error) {
    console.error("Error al eliminar el comentario:", error.message);
    res.status(500).json({ message: "Error al eliminar el comentario", error: error.message });
  }
};

// Editar un comentario
const editComment = async (req, res) => {
  const { commentId } = req.params; // Obtener el commentId desde los parámetros de la URL
  const { content } = req.body; // Obtener el contenido actualizado desde el cuerpo de la solicitud

  if (!content) {
    return res.status(400).json({ message: "El contenido del comentario es requerido" });
  }

  try {
    const connection = await connectDB();

    // Actualizar el comentario en la base de datos
    const [result] = await connection.execute(
      "UPDATE post_comments SET content = ? WHERE comment_id = ?",
      [content, commentId]
    );

    // Verificar si se actualizó algún comentario
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    // Enviar una respuesta exitosa
    res.status(200).json({ message: "Comentario actualizado exitosamente" });

    connection.end();
  } catch (error) {
    console.error("Error al editar el comentario:", error.message);
    res.status(500).json({ message: "Error al editar el comentario", error: error.message });
  }
};

export { getCommentsByPost, createPostComment, deleteComment, editComment };

// controllers/postController.js
import { connectDB } from "../db/database.js";

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    const { category_id } = req.query; // Obtener category_id desde la query string

    const connection = await connectDB();

    // Consulta SQL para obtener los posts y la cantidad de likes
    let query = `
      SELECT p.post_id, p.title, p.content, p.user_id, us.usuario, 
             GROUP_CONCAT(c.name ORDER BY c.name ASC) AS category_names,
             COALESCE(COUNT(pl.post_id), 0) AS likes_count,  -- Contar la cantidad de likes para cada post
             p.created_at  -- Añadir la fecha de creación del post
      FROM posts p
      INNER JOIN post_categories pc ON pc.post_id = p.post_id
      INNER JOIN categories c ON pc.category_id = c.category_id
      INNER JOIN usuarios us ON p.user_id = us.id
      LEFT JOIN post_likes pl ON p.post_id = pl.post_id  -- Realizamos un LEFT JOIN con la tabla de likes
    `;

    let queryParams = [];

    // Si se pasa category_id, agregar el filtro a la consulta
    if (category_id) {
      query += " WHERE c.category_id = ?";
      queryParams.push(category_id); // Agregar el valor de category_id a la consulta
    }

    query += " GROUP BY p.post_id"; // Agrupar por post_id para evitar duplicados

    const [posts] = await connection.execute(query, queryParams);

    res.json(posts); // Devolver las publicaciones con la cantidad de likes y la fecha de creación en formato JSON
    console.log(posts);
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las publicaciones" });
  }
};


// Crear una nueva publicación
const createPost = async (req, res) => {
  const { title, content, category_ids, user_id } = req.body;  // Usamos category_ids como array
  try {
    const connection = await connectDB();

    // Insertar la nueva publicación en la tabla 'posts'
    const [result] = await connection.execute(
      "INSERT INTO posts(title, content, user_id) VALUES (?, ?, ?)",
      [title, content, user_id]
    );
    
    const post_id = result.insertId;  // Obtener el ID del nuevo post creado

    // Insertar las categorías asociadas a este post en la tabla 'post_categories'
    if (category_ids && category_ids.length > 0) {
      const categoryInsertPromises = category_ids.map(category_id =>
        connection.execute(
          "INSERT INTO post_categories(post_id, category_id) VALUES (?, ?)",
          [post_id, category_id]
        )
      );

      // Esperar a que todas las inserciones en 'post_categories' se completen
      await Promise.all(categoryInsertPromises);
    }

    // Responder con el mensaje y el nuevo post_id
    res.status(201).json({ message: "Publicación creada", post_id });
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la publicación" });
  }
};

// Obtener todas las categorías
const getCategories = async (req, res) => {
  try {
    const connection = await connectDB();
    const [categories] = await connection.execute("SELECT category_id, name, description, created_at FROM categories");
    res.json(categories);  // Respondemos con las categorías en formato JSON
    connection.end();
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
};


// Eliminar una publicación por su ID
 const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const connection = await connectDB();

    // Verificar si el post existe
    const [post] = await connection.query(
      "SELECT * FROM posts WHERE post_id = ?",
      [postId]
    );

    if (post.length === 0) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    // Eliminar registros relacionados (post_categories, post_likes y comentarios)
    await connection.query("DELETE FROM post_categories WHERE post_id = ?", [postId]);
    await connection.query("DELETE FROM post_likes WHERE post_id = ?", [postId]);
    await connection.query("DELETE FROM post_comments WHERE post_id = ?", [postId]); // Eliminar comentarios relacionados

    // Eliminar el post
    await connection.query("DELETE FROM posts WHERE post_id = ?", [postId]);

    res.status(200).json({ message: "Publicación y sus relaciones eliminadas exitosamente." });
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    res.status(500).json({ message: "Error al eliminar la publicación." });
  }
};


export { getPosts, createPost, getCategories, deletePost };

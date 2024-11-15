// controllers/postController.js
import { connectDB } from "../db/database.js";

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    const connection = await connectDB();
    const [posts] = await connection.execute("SELECT p.title, p.content, p.user_id, us.usuario, c.name FROM posts p INNER JOIN post_categories pc ON pc.post_id=p.post_id INNER JOIN categories c on pc.category_id=c.category_id INNER JOIN usuarios us ON p.user_id=us.id");
    res.json(posts);
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

export { getPosts, createPost, getCategories };

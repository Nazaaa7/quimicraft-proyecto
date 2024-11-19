import { connectDB } from "../db/database.js";

// Controlador para crear un evento
export const createEvent = async (req, res) => {
  let connection;
  try {
    // Extraer datos del cuerpo de la solicitud
    const { title, description, start, end, user_id } = req.body;

    // Validar los datos necesarios
    if (!title || !start || !end || !user_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Validar que la fecha de inicio sea anterior a la de fin
    if (new Date(start) >= new Date(end)) {
      return res.status(400).json({ message: "La hora de inicio debe ser anterior a la hora de fin" });
    }

    // Establecemos la conexión a la base de datos
    connection = await connectDB();

    // Realizar la inserción en la base de datos
    const query = `
      INSERT INTO events (title, description, start, end, user_id, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await connection.execute(query, [title, description, start, end, user_id]);

    // Enviar respuesta de éxito
    res.status(201).json({
      message: "Evento creado con éxito",
      eventId: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ message: "Error al crear el evento", error: error.message });
  } finally {
    if (connection) {
      await connection.end(); // Cerramos la conexión después de usarla
    }
  }
};

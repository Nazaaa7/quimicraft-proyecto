import { connectDB } from "../db/database.js";

// Controlador para obtener todos los elementos químicos
export const getElements = async (req, res) => {
  let connection;
  try {
    // Establecemos la conexión a la base de datos
    connection = await connectDB();

    // Realizamos la consulta a la base de datos para obtener todos los elementos
    const [rows] = await connection.execute("SELECT * FROM elements");

    // Enviamos la respuesta con los elementos encontrados
    res.json({ elements: rows });
  } catch (error) {
    console.error("Error al obtener los elementos:", error);
    // En caso de error, respondemos con un mensaje de error
    res.status(500).json({ message: "Error al obtener los elementos", error: error.message });
  } finally {
    if (connection) {
      await connection.end();  // Cerramos la conexión después de usarla
    }
  }
};

export const getElementDetails = async (req, res) => {
  const elementId = req.params.elementId; // Obtener el elementId desde los parámetros de la URL
  console.log('getElementDetails', elementId)
  // Verificar si elementId es válido
  let connection;
  if (!elementId) {
    return res.status(400).json({ message: "Element ID is required" });
  }

  try {
    connection = await connectDB();

    // Consulta SQL para obtener los detalles del elemento específico
    const query = `
    SELECT 
      id, element_id, discovery_description, name_origin, symbol_meaning, 
      periodic_law_description, periodic_table_evolution, electronic_configuration, 
      density, melting_point, boiling_point, conductivity, isotopes, valence, 
      reactivity, typical_compounds, industrial_uses, everyday_uses, environmental_impact, 
      image
    FROM element_details 
    WHERE element_id = ?;
  `;
    
    const [rows] = await connection.execute(query, [elementId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Element not found" });
    }

    // Deshabilitar la caché en la respuesta
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Enviar los detalles del elemento encontrado
    res.json(rows[0]); // Solo enviamos el primer resultado
  } catch (error) {
    console.error("Error al obtener los detalles del elemento:", error);
    res.status(500).json({ message: "Error al obtener los detalles del elemento", error: error.message });
  } finally {
    if (connection) {
      await connection.end();  // Cerramos la conexión después de usarla
    }
  }
};

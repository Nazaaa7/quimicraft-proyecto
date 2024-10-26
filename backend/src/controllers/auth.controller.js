import { connectDB } from "../db/database.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";

// Controlador para obtener tipos de usuario
export const getTiposUsuario = async (req, res) => {
  const connection = await connectDB();
  const sql = "SELECT * FROM tipousuario";
  
  try {
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener tipos de usuario:", error);
    res.status(500).json({ msg: "Error al obtener tipos de usuario" });
  } finally {
    if (connection) connection.end();
  }
};

// Controlador para el registro de usuario
export const register = async (req, res) => {
  const { 
    nombre, 
    apellido, 
    dni, 
    usuario, 
    correo, 
    contrasenia, 
    id_rela_tipo_usuario 
  } = req.body;

  const connection = await connectDB();

  try {
    // Primero verificamos si el usuario ya existe en la tabla USUARIOS
    const [existingUser] = await connection.query(
      "SELECT * FROM USUARIOS WHERE dni = ? OR usuario = ? OR correo = ?",
      [dni, usuario, correo]
    );

    if (existingUser.length > 0) {
      const field = existingUser[0].dni === dni 
        ? "DNI" 
        : existingUser[0].usuario === usuario 
          ? "nombre de usuario" 
          : "correo electrónico";
      return res.status(400).json({ 
        msg: `Ya existe un usuario registrado con este ${field}` 
      });
    }

    // Determinar la tabla correspondiente según el tipo de usuario
    let tableName = "";
    switch (id_rela_tipo_usuario) {
      case "1":
      case 1:
        tableName = "administradores";
        break;
      case "2":
      case 2:
        tableName = "profesor";
        break;
      case "3":
      case 3:
        tableName = "estudiante";
        break;
      default:
        return res.status(400).json({ msg: "Tipo de usuario no válido" });
    }

    // Verificar si el DNI existe en la tabla correspondiente
    const [dniExists] = await connection.query(
      `SELECT * FROM ${tableName} WHERE dni = ?`,
      [dni]
    );

    if (dniExists.length === 0) {
      return res.status(400).json({
        msg: `El DNI ${dni} no está registrado como ${tableName}. Por favor, verifica que este DNI esté registrado en el sistema.`
      });
    }

    // Si todo está bien, procedemos con el registro
    const hashContrasenia = await bcrypt.hash(contrasenia, 10);

    const [result] = await connection.query(
      `INSERT INTO USUARIOS (nombre, apellido, dni, usuario, correo, contrasenia, id_rela_tipo_usuario) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, dni, usuario, correo, hashContrasenia, id_rela_tipo_usuario]
    );

    // Generar token para el nuevo usuario
    const token = await generarJWT({
      id: result.insertId,
      tipo_usuario: id_rela_tipo_usuario
    });

    res.status(201).json({
      msg: "Usuario registrado correctamente",
      token,
      usuario: {
        id: result.insertId,
        nombre,
        tipo_usuario: id_rela_tipo_usuario
      }
    });

  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ 
      msg: "Error al registrar el usuario", 
      error: error.message 
    });
  } finally {
    if (connection) connection.end();
  }
};

// Controlador para el inicio de sesión
export const login = async (req, res) => {
  const { usuario, contrasenia } = req.body;
  const connection = await connectDB();

  try {
    const [buscarUsuario] = await connection.query(
      `SELECT u.*, t.descripcion AS tipo_usuario
       FROM USUARIOS u
       JOIN tipousuario t ON u.id_rela_tipo_usuario = t.idTipoUsuario
       WHERE u.usuario = ? OR u.correo = ?
       LIMIT 1`,
      [usuario, usuario]
    );

    if (!buscarUsuario[0]) {
      return res.status(400).json({ 
        msg: "No existe una cuenta con este usuario o correo electrónico" 
      });
    }

    const validarContrasenia = await bcrypt.compare(
      contrasenia,
      buscarUsuario[0].contrasenia
    );

    if (!validarContrasenia) {
      return res.status(401).json({ 
        msg: "La contraseña es incorrecta" 
      });
    }

    const token = await generarJWT({
      id: buscarUsuario[0].id,
      tipo_usuario: buscarUsuario[0].tipo_usuario,
    });

    res.json({
      msg: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: buscarUsuario[0].id,
        nombre: buscarUsuario[0].nombre,
        tipo_usuario: buscarUsuario[0].tipo_usuario
      }
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ 
      msg: "Error en el inicio de sesión",
      error: error.message 
    });
  } finally {
    if (connection) connection.end();
  }
};
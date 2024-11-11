import { getElements, getElementDetails } from "../controllers/table.controller.js";  // Importamos la función del controlador
import { Router } from "express";

const tableRouter = Router();  // Creamos el router para la tabla de elementos químicos

// Ruta para obtener todos los elementos químicos
tableRouter.get("/elements", getElements);

// Ruta para obtener detalles de un elemento químico

tableRouter.get("/elements/:elementId", getElementDetails);

export { tableRouter };

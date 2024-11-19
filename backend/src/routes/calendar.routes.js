import express from "express";
import { createEvent } from "../controllers/calendar.controller.js";

const calendarRouter = express.Router();

// Ruta POST para crear un evento
calendarRouter.post("/create", createEvent);

export default calendarRouter;

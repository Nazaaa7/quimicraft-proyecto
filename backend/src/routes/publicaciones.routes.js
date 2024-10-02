import {
  getPublicaciones,
  deletePublicacion
} from "../controllers/publicaciones.controller.js";

import { Router } from "express";

const publicacionesRouter = Router();

publicacionesRouter.get("/publicaciones", getPublicaciones);

publicacionesRouter.get("/publicaciones/:id", deletePublicacion);


export { publicacionesRouter };

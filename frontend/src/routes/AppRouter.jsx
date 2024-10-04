// src/routes/AppRouter.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Estudiantes from "../views/estudiantes/Estudiantes";
import OrganicCompoundConcept from "../views/estudiantes/organicCompoundConcept";
import Projects from "../views/estudiantes/project" 
import Profesores from "../views/profesores/profesores"; 
import Admin from "../views/admin/admin"; 

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas accesibles solo si no está autenticado */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas privadas accesibles solo si está autenticado */}
        <Route element={<PrivateRoutes />}>
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/profesores" element={<Profesores />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/organicCompoundConcept" element={<OrganicCompoundConcept />} />
          <Route path="/projects" element={<Projects />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

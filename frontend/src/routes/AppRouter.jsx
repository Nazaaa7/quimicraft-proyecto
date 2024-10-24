// src/routes/AppRouter.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Estudiantes from "../views/estudiantes/estudiantes";
import OrganicCompoundConcept from "../views/estudiantes/organicCompoundConcept";
import Projects from "../views/estudiantes/project" 
import Profesores from "../views/profesores/profesores"; 
import Admin from "../views/admin/admin"; 
import EventCards  from "../views/estudiantes/yearCard";
import SubjectI from "../views/estudiantes/subjectsI";
import BalanceEnergy from "../views/estudiantes/energyBalance";
import Sedimentation from "../views/estudiantes/sedimentation";
import Tamization from "../views/estudiantes/tamization";
import Filtration from "../views/estudiantes/filtration";
import Desintegration from "../views/estudiantes/desintegration";

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
          <Route path="/balanceEnergy" element={<BalanceEnergy />} />
          <Route path="/material" element={<EventCards />} />
          <Route path="/materiasI" element={<SubjectI />} />
          <Route path="/sedimentation" element={<Sedimentation />} />
          <Route path="/tamization" element={<Tamization />} />
          <Route path="/desintegration" element={<Desintegration />} />
          <Route path="/filtracion" element={<Filtration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

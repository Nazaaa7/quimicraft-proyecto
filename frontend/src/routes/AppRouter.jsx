// src/routes/AppRouter.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Estudiantes from "../views/estudiantes/estudiantes";

import OrganicCompoundConcept from "../views/estudiantes/organicCompoundConcept";
import OrganicCompound from "../views/profesores/organicCompound";

import Calendar from "../views/estudiantes/calendar";
import Profesores from "../views/profesores/profesores"; 
import Admin from "../views/admin/admin"; 
import EventCards  from "../views/estudiantes/yearCard";
import EventCard  from "../views/profesores/yearCards";
import SubjectI from "../views/estudiantes/subjectsI";
import Subject from "../views/estudiantes/subjectsI";

import BalanceEnergy from "../views/estudiantes/energyBalance";
import Sedimentation from "../views/estudiantes/sedimentation";
import Tamization from "../views/estudiantes/tamization";
import Filtration from "../views/estudiantes/filtration";
import Desintegration from "../views/estudiantes/desintegration";
import Footer from "../views/estudiantes/footer";
import Projects from "../views/profesores/projects" ;

import Project from "../views/estudiantes/project"


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
          <Route path="/calendar" element={<Calendar />} />

          <Route path="/balanceEnergy" element={<BalanceEnergy />} />
          <Route path="/material" element={<EventCards />} />
          <Route path="/materiasI" element={<SubjectI />} />
          <Route path="/sedimentation" element={<Sedimentation />} />
          <Route path="/tamization" element={<Tamization />} />
          <Route path="/desintegration" element={<Desintegration />} />
          <Route path="/filtracion" element={<Filtration />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/project" element={<Project />} />
          <Route path="/projects" element={<Projects />} />

          <Route path="/materiales" element={<EventCard />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/organicCompound" element={<OrganicCompound/>} />






        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

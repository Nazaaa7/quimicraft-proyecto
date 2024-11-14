// src/routes/AppRouter.jsxextraction
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
import Subject from "../views/profesores/subject";
import BalanceEnergy from "../views/estudiantes/energyBalance";
import Sedimentation from "../views/estudiantes/sedimentation";
import Tamization from "../views/estudiantes/tamization";
import Filtration from "../views/estudiantes/filtration";
import Desintegration from "../views/estudiantes/desintegration";
import Footer from "../views/estudiantes/footer";
import Projects2 from "../views/profesores/projects2" ;
import Project from "../views/estudiantes/project";
import Evaporation from "../views/estudiantes/evaporitation";
import SecadoQuimico from "../views/estudiantes/driying";
import ExtraccionQuimica from "../views/estudiantes/extraction";
import BalanceDeMasas from "../views/estudiantes/balance";
import Cristalizacion from "../views/estudiantes/cristalitation";



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
          <Route path="/projects2" element={<Projects2/>} />
          <Route path="/project" element={<Project />} />
          <Route path="/materiales" element={<EventCard />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/organicCompound" element={<OrganicCompound/>} />
          <Route path="/evaporitation" element={<Evaporation/>} />
          <Route path="/cristalitation" element={<Cristalizacion/>} />
          <Route path="/driying" element={<SecadoQuimico/>} />
          <Route path="/balance" element={<BalanceDeMasas/>} />
          <Route path="/extraction" element={<ExtraccionQuimica/>} />

          






        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

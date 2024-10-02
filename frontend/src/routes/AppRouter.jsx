// src/routes/AppRouter.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Estudiantes from "../views/estudiantes/Estudiantes"; 
import Profesores from "../views/profesores/Profesores"; 
import Publicaciones from "../views/admin/publicaciones";
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
          <Route path="/publicaciones" element={<Publicaciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

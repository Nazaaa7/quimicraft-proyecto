import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarTiposUsuario = async () => {
    try {
      const req = await fetch("http://localhost:3000/tipos-usuario");
      if (!req.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await req.json();
      setTiposUsuario(data);
    } catch (error) {
      console.error("Error al cargar los tipos de usuario", error);
      setError("No se pudieron cargar los tipos de usuario.");
    }
  };

  useEffect(() => {
    cargarTiposUsuario();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Inicia la carga

    if (!form.nombre || !form.apellido || !form.dni || !form.usuario || !form.correo || !form.contrasenia || !form.id_rela_tipo_usuario) {
      setError("Por favor, completa todos los campos.");
      setLoading(false); // Detén la carga
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.correo)) {
      setError("Por favor, introduce un correo electrónico válido.");
      setLoading(false);
      return;
    }

    if (form.contrasenia.length < 4) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const req = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();

      if (req.ok) {
        navigate("/"); // Redirige a la página de inicio o dashboard
      } else {
        setError(res.msg);
      }
    } catch (error) {
      console.error("Error en el registro", error);
      setError("Hubo un problema con el registro. Inténtalo más tarde.");
    } finally {
      setLoading(false); // Detiene la carga
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-custom-green flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Crear Cuenta</h2>
          <p className="text-gray-500">Regístrate y comienza a estudiar</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FloatingLabel controlId="nombre" label="Nombre">
              <Form.Control
                placeholder="Nombre"
                name="nombre"
                onChange={handleChange}
                className="rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="apellido" label="Apellido">
              <Form.Control
                placeholder="Apellido"
                name="apellido"
                onChange={handleChange}
                className="rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </FloatingLabel>
          </div>

          <FloatingLabel controlId="dni" label="DNI">
            <Form.Control
              placeholder="DNI"
              name="dni"
              onChange={handleChange}
              className="rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="usuario" label="Usuario">
            <Form.Control
              placeholder="Usuario"
              name="usuario"
              onChange={handleChange}
              className="rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="correo" label="Correo">
            <Form.Control
              type="email"
              placeholder="Correo"
              name="correo"
              onChange={handleChange}
              className="rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="contrasenia" label="Contraseña">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="contrasenia"
              onChange={handleChange}
              className="rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="tipo_usuario_id" label="Tipo de Usuario">
            <Form.Select
              name="id_rela_tipo_usuario"
              onChange={handleChange}
              className="rounded-lg focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Selecciona un tipo de usuario</option>
              {tiposUsuario.map((tipo) => (
                <option key={tipo.idTipoUsuario} value={tipo.idTipoUsuario}>
                  {tipo.descripcion}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </Form>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes una cuenta? 
            <a 
              href="/" 
              className="text-green-600 hover:text-green-800 ml-2 font-semibold"
            >
              Iniciar Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
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
    <main className="register-container">
      <div className="register-header">
        <h2 className="register-title">Registrarse</h2>
        <span>Complete los datos para crear un usuario</span>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <Form className="register-form" onSubmit={handleSubmit}>
        <FloatingLabel controlId="nombre" label="Nombre" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="apellido" label="Apellido" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Apellido"
            name="apellido"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="dni" label="DNI" className="mb-3">
          <Form.Control
            type="text"
            placeholder="DNI"
            name="dni"
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="usuario" label="Usuario" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Usuario"
            name="usuario"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="correo" label="Correo" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Correo"
            name="correo"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="contrasenia" label="Contraseña" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="contrasenia"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="tipo_usuario_id" label="Tipo de Usuario" className="mb-3">
          <Form.Select
            aria-label="Selecciona el tipo de usuario"
            name="id_rela_tipo_usuario"
            onChange={handleChange}
          >
            <option value="">Selecciona un tipo de usuario</option>
            {tiposUsuario.map((tipo) => (
              <option key={tipo.idTipoUsuario} value={tipo.idTipoUsuario}>
                {tipo.descripcion}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <button className="button-register" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </Form>
    </main>
  );
};

export default Register;

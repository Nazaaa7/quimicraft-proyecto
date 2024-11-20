import React, { useState, useContext } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate();
  const { stateDispatch } = useContext(UserContext);
  const [form, setForm] = useState({
    usuario: "",
    contrasenia: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!form.usuario || !form.contrasenia) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const peticion = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const response = await peticion.json();

      if (peticion.ok) {
        const tipoUsuario = response.usuario.tipo_usuario;
        
        localStorage.setItem("userData", JSON.stringify({
          isLogged: true,
          token: response.token,
          usuario: response.usuario.nombre,
          role: tipoUsuario,
        }));
  
        stateDispatch({
          type: "login",
          payload: {
            token: response.token,
            usuario: response.usuario.nombre,
            role: tipoUsuario,
          },
        });
  
        switch (tipoUsuario.toLowerCase()) {
          case "estudiante":
            navigate("/estudiantes");
            break;
          case "profesor":
            navigate("/profesores");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            setError(`Tipo de usuario no reconocido: ${tipoUsuario}`);
            break;
        }
      } else {
        setError(response.msg || "Error al iniciar sesión.");
      }
    } catch (error) {
      setError("Hubo un problema con el inicio de sesión. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-custom-green flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Iniciar Sesión</h2>
          <p className="text-gray-500">Accede a tu cuenta</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabel controlId="usuario" label="Usuario">
            <Form.Control
              placeholder="Usuario"
              name="usuario"
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
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </Form>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes una cuenta? 
            <a 
              href="/register" 
              className="text-green-600 hover:text-green-800 ml-2 font-semibold"
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
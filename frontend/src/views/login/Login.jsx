import { useState, useContext } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom"; 
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { stateDispatch } = useContext(UserContext);
  const [form, setForm] = useState({
    usuario: "",
    contrasenia: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const peticion = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const response = await peticion.json();
      console.log("Respuesta del servidor:", response);
  
      if (peticion.ok) {
        // Extraer el tipo de usuario del objeto usuario en la respuesta
        const tipoUsuario = response.usuario.tipo_usuario;
        
        // Guardar en localStorage
        localStorage.setItem("userData", JSON.stringify({
          isLogged: true,
          token: response.token,
          usuario: response.usuario.nombre,
          role: tipoUsuario,
        }));
  
        // Actualizar el contexto
        stateDispatch({
          type: "login",
          payload: {
            token: response.token,
            usuario: response.usuario.nombre,
            role: tipoUsuario,
          },
        });
  
    // Redireccionar según el tipo de usuario
switch (tipoUsuario.toLowerCase()) {
  case "estudiante":
    navigate("/estudiantes");
    break;
  case "profesor":
    navigate("/profesores");
    break;
  case "admin": // Asegúrate de que coincida con la base de datos
    navigate("/admin");
    break;
  default:
    setErrorMessage(`Tipo de usuario no reconocido: ${tipoUsuario}`);
    console.error("Tipo de usuario no reconocido:", tipoUsuario);
    break;
}

      } else {
        console.error("Error al iniciar sesión:", response.msg);
        setErrorMessage(response.msg || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrorMessage("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="login-container">
      <div className="login-header">
        <h2 className="login-title">Inicia sesión</h2>
      </div>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <Form className="login-form" onSubmit={handleSubmit}>
        <FloatingLabel controlId="usuario" label="Nombre de Usuario" className="mb-3">
          <Form.Control
            type="text"
            placeholder="example123"
            name="usuario"
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="contrasenia" label="Contraseña" className="mb-3 password-input">
          <Form.Control
            type="password"
            placeholder="name12312"
            name="contrasenia"
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <span className="login-label">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </span>

        <button 
          className="button-login" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </Form>
    </main>
  );
};

export default Login;
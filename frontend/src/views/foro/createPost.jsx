import React, { useState, useEffect } from "react";
const CreatePost = ({ onPostCreated, onClose }) => {  // Recibimos `onClose` como prop
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);  // Estado para las categorías seleccionadas
  const [categories, setCategories] = useState([]);  // Estado para las categorías
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);  // Estado para almacenar el user_id del token

  // Cargar userId desde localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));  // Obtener los datos de usuario desde localStorage

    if (userData && userData.token) {
      try {
        const decodedToken = jwt_decode(userData.token);  // Decodificar el token
        setUserId(decodedToken.id.id);  // Obtener el userId desde el payload
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setError("No se pudo verificar el usuario.");
      }
    } else {
      setError("No se encontró el token de usuario.");
    }
  }, []);  // Solo se ejecuta una vez al montar el componente

  // Cargar las categorías desde la base de datos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/categories");
        const data = await response.json();
        setCategories(data);  // Almacenar las categorías en el estado
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setError("No se pudieron cargar las categorías.");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);  // Desmarcar si ya está seleccionada
      } else {
        return [...prevSelectedCategories, categoryId];  // Marcar la categoría
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación simple
    if (!title.trim() || !content.trim() || selectedCategories.length === 0) {
      setError("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/posts/cargar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Asegura que el servidor espera JSON
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category_ids: selectedCategories,  // Enviar las categorías seleccionadas como un array
          user_id: userId,  // Enviar el user_id obtenido del token
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la publicación");
      }
  
      const newPost = await response.json();  // Obtener la nueva publicación creada
      onPostCreated(newPost);  // Pasar la nueva publicación al componente padre
  
      // Limpiar los campos del formulario después de enviar
      setTitle("");
      setContent("");
      setSelectedCategories([]);
      setError("");  // Limpiar cualquier error
    } catch (error) {
      setError("Hubo un error al crear la publicación.");
      console.error(error);
    }
  };

  // Desactivar el scroll global cuando el formulario está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Desactiva el scroll

    // Restaurar el scroll cuando el componente se desmonta o se cierra el formulario
    return () => {
      document.body.style.overflow = "auto"; // Restaura el scroll
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="justify-center w-8/12 bg-white pt-2 pb-4 pr-5 pl-5 rounded-lg shadow-lg h-auto relative">
        {/* Botón de cerrar (X) */}
        <button
          onClick={onClose}  // Llamar a la función `onClose` para cerrar el formulario
          className="absolute top-2 left-2 text-2xl font-semibold text-gray-700 transform transition-all duration-300 hover:scale-110 hover:text-red-500 bg-transparent scale-105 focus:outline-none"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Crear Nueva Publicación</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 justify-center">
            <label className="block text-gray-600 mb-2 text-center" htmlFor="title">
              Título
            </label>
            <div className="flex justify-center">
              <input
                type="text"
                id="title"
                className="w-full p-2 h-10 border border-gray-300 rounded-md text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe el título de la publicación"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="content">
              Contenido
            </label>
            <textarea
              id="content"
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de la publicación"
            />
          </div>

          {/* Botones de categorías */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="category">
              Categorías
            </label>
            <div className="flex flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category.category_id}
                  type="button"
                  onClick={() => handleCategoryClick(category.category_id)}
                  className={`p-1 m-1 border rounded-full text-xs transition duration-300 ${
                    selectedCategories.includes(category.category_id)
                      ? "bg-green-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-green-600 hover:text-white`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full p-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition duration-300"
          >
            Crear Publicación
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

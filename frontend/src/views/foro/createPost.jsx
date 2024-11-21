import React, { useState, useEffect } from "react";

const CreatePost = ({ onPostCreated, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      try {
        const decodedToken = jwt_decode(userData.token);
        setUserId(decodedToken.id.id);
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Could not verify user.");
      }
    } else {
      setError("User token not found.");
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Could not load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => 
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title.trim() || !content.trim() || selectedCategories.length === 0) {
      setError("Please complete all fields.");
      return;
    }
  
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData.token;
  
      const response = await fetch("http://localhost:3000/api/posts/cargar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category_ids: selectedCategories,
          user_id: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la publicación");
      }
  
      const newPost = await response.json();  // Obtener la nueva publicación creada
      console.log(newPost);  // Imprime el nuevo post para verificar que tiene la estructura correcta
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
  
  

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
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

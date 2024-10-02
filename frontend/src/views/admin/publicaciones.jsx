// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { UserContext } from "../../context/UserContext";

// const Publicaciones = () => {
//   const { state } = useContext(UserContext);

//   const fetchPublicaciones = async () => {
//     try {
//       const token = state.token; // Obtén el token del contexto de usuario

//       const response = await axios.get("http://localhost:3000/publicaciones", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
//         },
//       });

//       console.log("Publicaciones:", response.data);
//     } catch (error) {
//       console.error("Error al obtener publicaciones:", error);
//       // Manejo de errores, como mostrar un mensaje de error
//     }
//   };

//   useEffect(() => {
//     if (state.token) { // Solo llama a fetchPublicaciones si hay un token
//       fetchPublicaciones();
//     }
//   }, [state.token]);

//   return (
//     <div>
//       <h1>Publicaciones</h1>
//       {/* Renderiza las publicaciones aquí */}
//     </div>
//   );
// };

// export default Publicaciones;


import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Post = ({ id, content, deletePost }) => {
  return (
    <div style={styles.postContainer}>
      <div style={styles.header}>
        <span>Post {id}</span>
        <FaTrash style={styles.deleteIcon} onClick={() => deletePost(id)} />
      </div>
      <p>{content}</p>
    </div>
  );
};

const PostsList = () => {
  const [posts, setPosts] = useState([
    { id: 1, content: "This is the first post" },
    { id: 2, content: "This is the second post" },
    { id: 3, content: "This is the third post" },
    { id: 4, content: "This is the fourth post" },
    { id: 5, content: "This is the fifth post" },
  ]);

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <div style={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} content={post.content} deletePost={deletePost} />
      ))}
    </div>
  );
};



export default PostsList;

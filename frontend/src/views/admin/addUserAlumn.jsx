import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SaveIcon, 
  XIcon, 
  UserPlusIcon 
} from 'lucide-react';

function AddUserForm({ editUser, setIsFormVisible, setUsers, userType }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fecha_nacimiento: '',
    dni: '',
  });

  useEffect(() => {
    if (editUser) {
      setFormData({
        nombre: editUser.nombre,
        apellido: editUser.apellido,
        correo: editUser.correo,
        fecha_nacimiento: editUser.fecha_nacimiento || '',
        dni: editUser.dni,
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the status is 201 or in the 200-299 range
      if (response.status === 201 || response.ok) {
        try {
          const result = await response.json();
          alert('Usuario creado correctamente.');
          setUsers((prevUsers) => [...prevUsers, result]);
          setIsFormVisible(false);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          alert('Usuario creado, pero hubo un problema procesando la respuesta.');
        }
      } else {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error(`Error al crear el usuario: ${errorText}`);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert(`Error al enviar la solicitud: ${error.message}`);
    }
  };
  

  // Función para actualizar un usuario
  const updateUser = async () => {
    try {
      // Depuración: añadir logs para verificar valores
      console.log('EditUser:', editUser); // Verifica que editUser tenga la información correcta
      console.log('UserType:', userType); // Verifica el tipo de usuario
      console.log('FormData:', formData); // Verifica los datos del formulario
  
      // Determinar la ruta correcta basada en el tipo de usuario
      const urlPath = userType === 'estudiante'
        ? `http://localhost:3000/admin/estudiante/${editUser.id_estudiante}` 
        : `http://localhost:3000/admin/profesor/${editUser.id_profesor}`;
  
      console.log('URL de actualización:', urlPath); // Verifica que la URL se construya correctamente
  
      // Asegurarse de que el ID esté correctamente agregado
      const response = await fetch(urlPath, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData, // los datos del formulario
          id: userType === 'estudiante' ? editUser.id_estudiante : editUser.id_profesor, // el ID correcto
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
  
      const result = await response.json();
      alert('Usuario actualizado correctamente.');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          userType === 'estudiante'
            ? user.id_estudiante === result.id_estudiante
              ? result
              : user
            : user.id_profesor === result.id_profesor
            ? result
            : user
        )
      );
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al enviar la solicitud');
    }
  };
  


  // Manejar el envío del formulario (creación o edición)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      updateUser(); // Si estamos editando, actualizamos el usuario
    } else {
      createUser(); // Si no estamos editando, creamos un nuevo usuario
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-4 p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-4">
          <UserPlusIcon className="mx-auto w-12 h-12 text-green-600 mb-2" />
          <h2 className="text-xl font-bold text-green-600">
            {editUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
          </h2>
        </div>

        {/* Nombre y Apellido en la misma fila */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex space-x-4"
        >
          <div className="flex-1">
            <label htmlFor="nombre" className="block text-sm font-medium text-green-600 mb-1">
              Nombre
            </label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="
                w-full p-2 
                border-2 border-green-400/30 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 focus:ring-green-400 
                transition-all duration-300
                text-green-600
              "
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="apellido" className="block text-sm font-medium text-green-600 mb-1">
              Apellido
            </label>
            <input
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="
                w-full p-2 
                border-2 border-green-400/30 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 focus:ring-green-400 
                transition-all duration-300
                text-green-600
              "
              required
            />
          </div>
        </motion.div>

        {/* Correo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mb-2"
        >
          <label htmlFor="correo" className="block text-sm font-medium text-green-600 mb-1">
            Correo
          </label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="
              w-full p-2 
              border-2 border-green-400/30 
              rounded-lg 
              focus:outline-none 
              focus:ring-2 focus:ring-green-400 
              transition-all duration-300
              text-green-600
            "
            required
          />
        </motion.div>

        {/* DNI y Fecha de Nacimiento en la misma fila */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex space-x-4"
        >
          <div className="flex-1">
            <label htmlFor="dni" className="block text-sm font-medium text-green-600 mb-1">
              DNI
            </label>
            <input
              type="number"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="
                w-full p-2 
                border-2 border-green-400/30 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 focus:ring-green-400 
                transition-all duration-300
                text-green-600
              "
              required
            />
          </div>
          
          {!editUser && (
            <div className="flex-1">
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-green-600 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className="
                  w-full p-2 
                  border-2 border-green-400/30 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 focus:ring-green-400 
                  transition-all duration-300
                  text-green-600
                "
              />
            </div>
          )}
        </motion.div>

        {/* Botones de acción */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex space-x-4 mt-4"
        >
          <button
            type="submit"
            className="
              flex-1 flex items-center justify-center 
              bg-green-400 text-white 
              py-2 px-4 
              rounded-lg 
              hover:bg-green-500 
              transition-all duration-300 
              transform hover:scale-105 
              shadow-md hover:shadow-lg
            "
          >
            <SaveIcon className="mr-2 w-5 h-5" />
            {editUser ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="
              flex-1 flex items-center justify-center 
              bg-red-400 text-white 
              py-2 px-4 
              rounded-lg 
              hover:bg-red-500 
              transition-all duration-300 
              transform hover:scale-105 
              shadow-md hover:shadow-lg
            "
          >
            <XIcon className="mr-2 w-5 h-5" />
            Cancelar
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default AddUserForm;
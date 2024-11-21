import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  PencilIcon, 
  TrashIcon, 
  PlusIcon, 
  SearchIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from 'lucide-react';
import AddUserForm from './addUserAlumn';  // Ruta del formulario
import Navbar from './navbar_re';

// Toast Notification Component
const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`fixed top-4 right-4 z-[100] flex items-center px-6 py-4 rounded-xl shadow-xl
        ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      {type === 'success' 
        ? <CheckCircleIcon className="mr-2 w-6 h-6" /> 
        : <XCircleIcon className="mr-2 w-6 h-6" />}
      {message}
    </motion.div>
  );
};

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userType, setUserType] = useState('estudiante');
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);
  const [toast, setToast] = useState(null);  // Estado para las notificaciones Toast

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/${userType}`);
      if (!response.ok) throw new Error('Error al obtener los usuarios');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setToast({ 
        type: 'error', 
        message: 'Error al cargar los usuarios' 
      });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = users.filter((user) => 
      ['nombre', 'apellido', 'correo'].some(key => 
        user[key].toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilteredUsers(filtered);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
  
    try {
      const response = await fetch(`http://localhost:3000/admin/${userType}/${userToDelete.id}`, {
        method: 'DELETE',
      });
  
      const responseData = await response.json(); // Intenta parsear la respuesta del servidor
  
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error con el mensaje del servidor
        throw new Error(responseData.message || 'Error al eliminar el usuario');
      }
      
      // Actualiza inmediatamente el estado para reflejar la eliminación
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      // Muestra la notificación de éxito con el mensaje del servidor si existe
      setToast({ 
        type: 'success', 
        message: responseData.message || 'Usuario eliminado correctamente' 
      });
      
      // Restablece la confirmación de eliminación
      setUserToDelete(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setToast({ 
        type: 'error', 
        message: error.message || 'Error al eliminar el usuario' 
      });
    }
  };

  const initiateDelete = (user) => {
    setUserToDelete(user);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsFormVisible(true);
  };

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  // Vuelve a cargar los usuarios si el formulario es cerrado o editado
  useEffect(() => {
    if (!isFormVisible) {
      fetchUsers();
    }
  }, [isFormVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400/10 to-green-400/30">
      <Navbar />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast 
            type={toast.type} 
            message={toast.message} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Contenedor principal de la aplicación */}
      <div className="container mx-auto px-4 py-8">
        {/* Selector de tipo de usuario */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center space-x-4 mb-6"
        >
          {['estudiante', 'profesor'].map(type => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`
                flex items-center px-6 py-2 rounded-full 
                transition-all duration-300 ease-in-out
                ${userType === type 
                  ? 'bg-green-400 text-white shadow-lg scale-105' 
                  : 'bg-green-400/20 text-green-600 hover:bg-green-400/40'
                }
              `}
            >
              <UserIcon className="mr-2 w-5 h-5" />
              {type === 'estudiante' ? 'Estudiantes' : 'Profesores'}
            </button>
          ))}
        </motion.div>

        {/* Input de búsqueda */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto mb-6"
        >
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600/70 w-5 h-5" />
            <input
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={handleSearch}
              className="
                w-full pl-10 pr-4 py-3 
                border-2 border-green-400/30 
                rounded-full 
                focus:outline-none 
                focus:ring-2 focus:ring-green-400/50 
                transition-all duration-300
              "
            />
          </div>
        </motion.div>

        {/* Botón de agregar usuario */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <button
            onClick={() => {
              setEditUser(null);
              setIsFormVisible(true);
            }}
            className="
              flex items-center 
              bg-green-400 hover:bg-green-400/80 
              text-white 
              px-6 py-3 
              rounded-full 
              shadow-lg 
              hover:shadow-xl 
              transition-all 
              duration-300 
              ease-in-out 
              transform 
              hover:-translate-y-1
            "
          >
            <PlusIcon className="mr-2 w-5 h-5" />
            Agregar Usuario
          </button>
        </motion.div>

        {/* Tabla de usuarios */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-green-400/10">
                <tr>
                  {['Nombre', 'Apellido', 'Correo', 'Acciones'].map(header => (
                    <th 
                      key={header} 
                      className="px-6 py-4 text-left text-green-600 font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="px-6 py-4">{user.nombre}</td>
                    <td className="px-6 py-4">{user.apellido}</td>
                    <td className="px-6 py-4">{user.correo}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 bg-blue-500 text-white rounded-full"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => initiateDelete(user)}
                          className="p-2 bg-red-500 text-white rounded-full"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>

        {/* Confirmación de eliminación */}
        <AnimatePresence>
          {userToDelete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
              >
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="w-12 h-12 text-red-500 mr-4" />
                  <h2 className="text-xl font-bold text-red-600">Confirmar Eliminación</h2>
                </div>
                
                <p className="text-center mb-6">
                  ¿Estás seguro de que quieres eliminar al usuario{' '}
                  <span className="font-bold">{userToDelete.nombre} {userToDelete.apellido}</span>?
                </p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setUserToDelete(null)}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default UserManagement;

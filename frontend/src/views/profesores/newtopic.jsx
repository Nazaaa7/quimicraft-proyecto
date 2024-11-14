import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';


const NewTopicButton = () => {
  const navigate = useNavigate();

  const handleNewTopic = () => {
    navigate('/newtopic');
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={handleNewTopic}
    >
      <FaPlus className="mr-2" />
      Nuevo Tema
    </button>
  );
};

export default NewTopicButton;
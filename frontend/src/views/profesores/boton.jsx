// BotonVolver.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonVolver = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate(-1); // Redirige a la página anterior
  };

  return (
    <button onClick={handleVolver} style={{ padding: '5px 5px', height: '45px',width:'90px', cursor: 'pointer' }}>
      Volver
    </button>
  );
};

export default BotonVolver;

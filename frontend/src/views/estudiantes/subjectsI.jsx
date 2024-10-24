import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/subjects.css';
import Navbar from './navbar';

// Datos organizados por cuatrimestre
const subjectsBySemester = {
  first: [
    {
      title: 'ANÁLISIS DE DATOS',
      path: '/projects',
      color: '#10B981',
      
    },
    {
      title: 'FORMULACIÓN Y PREPARACIÓN DE MEZCLAS',
      path: '/real-estate',
      color: '#10B981',
      
    },
    {
      title: 'OPERACIONES BÁSICAS EN LA INDUSTRIA QUÍMICA',
      path: '/social-media',
      color: '#10B981',
      
    },
    {
      title: 'GENERACIÓN Y RECUPERACIÓN DE ENERGÍA',
      path: '/social-media',
      color: '#10B981',
      
    }
  ],
  second: [
    {
      title: 'INGLÉS TÉCNICO I',
      path: '/social-media',
      color: '#10B981',
      
    },
    {
      title: 'ACONDICIONAMIENTO Y ALMACENAMIENTO DE PRODUCTOS QUÍMICOS',
      path: '/social-media',
      color: '#10B981',
      
    },
    {
      title: 'REGULACIÓN Y CONTROL DE PROCESOS QUÍMICOS I',
      path: '/social-media',
      color: '#10B981',
      
    },
    {
      title: 'MANTENIMIENTO ELECTROMECÁNICO EN INDUSTRIAS DE PROCESO',
      path: '/social-media',
      color: '#10B981',
      
    },
    {
      title: 'PREVENCIÓN DE RIESGOS EN INDUSTRIAS QUMICAS',
      path: '/social-media',
      color: '#10B981',
      
    },
    
  ]
};

const FolderCard = ({ project, onClick }) => {

  return (
  
    <div className="container">
    <div 
      className="folder-card"
      onClick={onClick}
    >
      <div 
        className="folder-content"
        style={{ backgroundColor: project.color }}
      >
        <h3 className="folder-title">{project.title}</h3>
        <div className="folder-footer">
          <span className="status-dot"></span>
        </div>
      </div>
      </div>
    </div>
  );
};

const SemesterSelector = ({ activeSemester, onChange }) => {
  return (
    <div className="semester-selector">
      <button 
        className={`semester-button ${activeSemester === 'first' ? 'active' : ''}`}
        onClick={() => onChange('first')}
      >
        Primer Cuatrimestre
      </button>
      <button 
        className={`semester-button ${activeSemester === 'second' ? 'active' : ''}`}
        onClick={() => onChange('second')}
      >
        Segundo Cuatrimestre
      </button>
    </div>
  );
};

const SubjectI = () => {
  const navigate = useNavigate();
  const [activeSemester, setActiveSemester] = useState('first');

  return (
    <div className="App">
      <Navbar/>
      <SemesterSelector 
        activeSemester={activeSemester}
        onChange={setActiveSemester}
      />
      <h1 className='h1'>Materias</h1>
      <div className="folder-grid">
        {subjectsBySemester[activeSemester].map((project, index) => (
          <FolderCard
            key={index}
            project={project}
            onClick={() => navigate(project.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectI;
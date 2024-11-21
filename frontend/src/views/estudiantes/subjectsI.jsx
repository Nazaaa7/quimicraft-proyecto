import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/subjects.css';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from './navbar_table';


// Datos organizados por cuatrimestre
const subjectsBySemester = {
  first: [
    {
      title: 'ANÁLISIS DE DATOS',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'FORMULACIÓN Y PREPARACIÓN DE MEZCLAS',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'OPERACIONES BÁSICAS EN LA INDUSTRIA QUÍMICA',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'GENERACIÓN Y RECUPERACIÓN DE ENERGÍA',
      path: '/project',
      color: '#46ad81',
      
    }
  ],
  second: [
    {
      title: 'INGLÉS TÉCNICO I',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'ACONDICIONAMIENTO Y ALMACENAMIENTO DE PRODUCTOS QUÍMICOS',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'REGULACIÓN Y CONTROL DE PROCESOS QUÍMICOS I',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'MANTENIMIENTO ELECTROMECÁNICO EN INDUSTRIAS DE PROCESO',
      path: '/project',
      color: '#46ad81',
      
    },
    {
      title: 'PREVENCIÓN DE RIESGOS EN INDUSTRIAS QUMICAS',
      path: '/project',
      color: '#46ad81',
      
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
  const [activeSemester, setActiveSemester] = useState('first');
  const navigate = useNavigate(); // Define navigate para usarlo después

  return (
    <div className="App">
      <Navbar/>
      <SemesterSelector 
        activeSemester={activeSemester}
        onChange={setActiveSemester}
      />
      <h1 className='h1'>Materias</h1>
      <button onClick={() => navigate(-1)} className="back">
          <FaArrowLeft size={24} />
        </button>
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/subject.css';
import Navbar from './navbar';
import { FaArrowLeft } from 'react-icons/fa';


// Datos organizados por cuatrimestre
const Semester = {
  first: [
    {
      title: 'ANÁLISIS DE DATOS',
      path: '/projects2',
      color: '#46ad81',
    },
    {
      title: 'FORMULACIÓN Y PREPARACIÓN DE MEZCLAS',
      path: '/projects',
      color: '#46ad81',
    },
  ],
  second: [
    {
      title: 'ACONDICIONAMIENTO Y ALMACENAMIENTO DE PRODUCTOS QUÍMICOS',
      path: '/social-media',
      color: '#46ad81',
    },
    {
      title: 'REGULACIÓN Y CONTROL DE PROCESOS QUÍMICOS I',
      path: '/social-media',
      color: '#46ad81',
    },
  ]
};

const Card = ({ project, onClick }) => {
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

const Subjects2 = () => {
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
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft size={24} />
      </button>
      <div className="folder-grid">
        {Semester[activeSemester].map((project, index) => (
          <Card
            key={index}
            project={project}
            onClick={() => navigate(project.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default Subjects2;
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { FaArrowLeft } from 'react-icons/fa';
import "./assets/css/yearCard.css"

const EventCard = () => {
  const navigate = useNavigate();

  const events = [
    {
      date: "2024",
      title: "Química Industrial I",
      location: "Instituto Politécnico Formosa",
      path: "/subject"
    },
  ];

  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
      <button onClick={() => navigate(-1)} className="back-button"  >
        <FaArrowLeft size={24} />
      </button>
        <div className="cards-container">
          <div className="chemistry-event-cards">
            {events.map((event, index) => (
              <div
                key={index}
                className="card"
                onClick={() => navigate(event.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-header">
                  <div className="date">{event.date}</div>
                </div>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
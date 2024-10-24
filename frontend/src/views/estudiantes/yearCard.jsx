
// EventCards.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sideBar";
import Navbar from "./navbar";
import './assets/css/yearCard.css';

const EventCards = () => {
  const navigate = useNavigate();

  const events = [
    {
      date: "2024", 
      title: "Química Industrial I",
      location: "Instituto Politécnico Formosa",
      path: "/materiasI"
    },
    {
      date: "2024",
      title: "Química Industrial II",
      location: "Instituto Politécnico Formosa",
      path: "/subjects-ii"
    },
    {
      date: "2024",
      title: "Química Industrial III",
      location: "Instituto Politécnico Formosa",
      path: "/subjects-iii"
    },
  ];

  return (
    <div className="layout-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
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
    </div>
  );
};

export default EventCards;

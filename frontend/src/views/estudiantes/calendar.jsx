import  { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './navbar';
import Sidebar from './sideBar';
import Footer from './footer';

const localizer = momentLocalizer(moment);

const OrganicCompoundConcept = () => {
  const [events, setEvents] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const saveEventsToLocalStorage = (eventsToSave) => {
    try {
      const eventsString = JSON.stringify(eventsToSave);
      localStorage.setItem('myCalendarEvents', eventsString);
      console.log('Eventos guardados:', eventsToSave);
    } catch (error) {
      console.error('Error al guardar eventos:', error);
    }
  };

  const loadEventsFromLocalStorage = () => {
    try {
      const storedEvents = localStorage.getItem('myCalendarEvents');
      console.log('Eventos almacenados (raw):', storedEvents);
      
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        console.log('Eventos parseados:', parsedEvents);
        
        const eventsWithDates = parsedEvents.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        
        console.log('Eventos con fechas convertidas:', eventsWithDates);
        return eventsWithDates;
      }
      return [];
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadedEvents = loadEventsFromLocalStorage();
    setEvents(loadedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      saveEventsToLocalStorage(events);
    }
  }, [events]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Nombre del evento:');
    if (!title) return;

    const description = window.prompt('Descripción del evento:');
    if (!description) return;

    const newEvent = {
      id: `event-${Date.now()}`,
      title,
      description,
      start,
      end,
      created: new Date().toISOString()
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  const handleSelectEvent = (event) => {
    const eventDetails = `
      Evento: ${event.title}
      Descripción: ${event.description}
      Inicio: ${moment(event.start).format('DD/MM/YYYY HH:mm')}
      Fin: ${moment(event.end).format('DD/MM/YYYY HH:mm')}
    `;
    alert(eventDetails);
  };
  

  const handleEventDelete = (event) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      const updatedEvents = events.filter(e => e.id !== event.id);
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div style={{
        display: "flex",
        height: "664px",
        marginBottom: "36px",
      }}>

        <Sidebar />
        <div style={{
        height: "500px"
      }}>
          <div className="p-4">
            <h1 className="text- font-bold mb-4">
              Calendario
            </h1>

        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(600px - 12rem)", width: "calc(100vw - 300px)" }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onDoubleClickEvent={handleEventDelete}
            popup={true}
            messages={{
              today: "Hoy",
              previous: "Anterior",
              next: "Siguiente",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda"
            }}
          />
      </div>
    
            
        </div>
      </div>
      

      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <button 
              className="float-right text-gray-600 hover:text-gray-900"
              onClick={() => setIsChatOpen(false)}
            >
            </button>
          </div>

        </div>
      )}
        <Footer/>

    </div>

  );
};


export default OrganicCompoundConcept;
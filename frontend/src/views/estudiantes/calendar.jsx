import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './navbar';
import Sidebar from './sideBar';

const localizer = momentLocalizer(moment);

const OrganicCompoundConcept = () => {
  const [events, setEvents] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Guardar eventos en localStorage
  const saveEventsToLocalStorage = (eventsToSave) => {
    try {
      localStorage.setItem('myCalendarEvents', JSON.stringify(eventsToSave));
    } catch (error) {
      console.error('Error al guardar eventos en localStorage:', error);
    }
  };

  // Cargar eventos desde localStorage
  const loadEventsFromLocalStorage = () => {
    try {
      const storedEvents = localStorage.getItem('myCalendarEvents');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents).map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        return parsedEvents;
      }
      return [];
    } catch (error) {
      console.error('Error al cargar eventos desde localStorage:', error);
      return [];
    }
  };

  // Efecto para cargar eventos al montar el componente
  useEffect(() => {
    const loadedEvents = loadEventsFromLocalStorage();
    setEvents(loadedEvents);
  }, []);

  // Efecto para guardar eventos cada vez que cambien
  useEffect(() => {
    saveEventsToLocalStorage(events);
  }, [events]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Nombre del evento:');
    if (!title) return;

    const description = prompt('Descripción del evento:');
    if (!description) return;

    const startDate = prompt('Fecha y hora de inicio (YYYY-MM-DD HH:mm):', moment(start).format('YYYY-MM-DD HH:mm'));
    const endDate = prompt('Fecha y hora de fin (YYYY-MM-DD HH:mm):', moment(end).format('YYYY-MM-DD HH:mm'));

    if (!startDate || !endDate) return;

    const newEvent = {
      id: `event-${Date.now()}`,
      title,
      description,
      start: new Date(startDate),
      end: new Date(endDate),
    };

    setEvents([...events, newEvent]); // Actualiza eventos y dispara el efecto de guardar
  };

  const handleSelectEvent = (event) => {
    const action = prompt(
      `Seleccionaste el evento "${event.title}". Escribe:
1 para Ver detalles
2 para Editar
3 para Eliminar`
    );

    if (action === '1') {
      alert(`
        Evento: ${event.title}
        Descripción: ${event.description}
        Inicio: ${moment(event.start).format('DD/MM/YYYY HH:mm')}
        Fin: ${moment(event.end).format('DD/MM/YYYY HH:mm')}
      `);
    } else if (action === '2') {
      handleEditEvent(event);
    } else if (action === '3') {
      handleEventDelete(event);
    }
  };

  const handleEditEvent = (event) => {
    const title = prompt('Editar título:', event.title);
    if (!title) return;

    const description = prompt('Editar descripción:', event.description);
    if (!description) return;

    const startDate = prompt('Editar fecha y hora de inicio (YYYY-MM-DD HH:mm):', moment(event.start).format('YYYY-MM-DD HH:mm'));
    const endDate = prompt('Editar fecha y hora de fin (YYYY-MM-DD HH:mm):', moment(event.end).format('YYYY-MM-DD HH:mm'));

    if (!startDate || !endDate) return;

    const updatedEvent = {
      ...event,
      title,
      description,
      start: new Date(startDate),
      end: new Date(endDate),
    };

    setEvents(events.map(e => (e.id === event.id ? updatedEvent : e))); // Actualiza y persiste
  };

  const handleEventDelete = (event) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      setEvents(events.filter(e => e.id !== event.id)); // Elimina y persiste
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', height: '620px' }}>
        <Sidebar />
        <div >
          <div className="p-3">
            <h1 className="text- font-bold mb-4">Calendario</h1>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc(600px - 12rem)', width: 'calc(100vw - 300px)' }}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              popup
              messages={{
                today: 'Hoy',
                previous: 'Anterior',
                next: 'Siguiente',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
              }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OrganicCompoundConcept;

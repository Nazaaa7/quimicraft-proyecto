import { useState, useEffect } from 'react';
import moment from 'moment';
import Navbar from './navbar_table';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
  const [newNote, setNewNote] = useState({ content: '', date: '' });
  const [isEventMode, setIsEventMode] = useState(true);
  const [userId, setUserId] = useState(null);  // Estado para almacenar el user_id del token

  // Cargar userId desde localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));  // Obtener los datos de usuario desde localStorage

    if (userData && userData.token) {
      try {
        const decodedToken = jwt_decode(userData.token);  // Decodificar el token
        setUserId(decodedToken.id.id);  // Obtener el userId desde el payload
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setError("No se pudo verificar el usuario.");
      }
    } else {
      setError("No se encontró el token de usuario.");
    }
  }, []);  // Solo se ejecuta una vez al montar el componente

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const createCalendarDays = () => {
    const days = [];
    const startDay = selectedDate.clone().startOf('month').day();
    const daysInMonth = selectedDate.daysInMonth();

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const createEvent = async (eventData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      const result = await response.json();
      if (response.ok) {
        setEvents([...events, { ...eventData, id: result.eventId }]);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  // Fetch: Crear nota
  const createNote = async (noteData) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
      const result = await response.json();
      if (response.ok) {
        setNotes([...notes, { ...noteData, id: result.noteId }]);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  // Fetch: Obtener eventos por mes y usuario
  const fetchEvents = async (year, month) => {
    try {
      const response = await fetch(`/api/events/${year}/${month}/${userId}`);
      const result = await response.json();
      if (response.ok) {
        setEvents(result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
    }
  };

  // Fetch: Obtener notas por mes y usuario
  const fetchNotes = async (year, month) => {
    try {
      const response = await fetch(`/api/notes/${year}/${month}/${userId}`);
      const result = await response.json();
      if (response.ok) {
        setNotes(result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error al cargar las notas:', error);
    }
  };

  // Fetch: Obtener días con contenido
  const fetchDaysWithContent = async (year, month) => {
    try {
      const response = await fetch(`/api/days-with-content/${year}/${month}/${userId}`);
      const result = await response.json();
      if (response.ok) {
        console.log('Días con contenido:', result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error al cargar los días con contenido:', error);
    }
  };

  const handleDayClick = (day) => {
    const selected = selectedDate.clone().date(day);
    setSelectedDate(selected);
    setShowModal(true);
  };

  const handlePreviousMonth = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate(selectedDate.clone().add(1, 'month'));
  };

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleNoteChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    setEvents([...events, { ...newEvent, date: selectedDate.format('YYYY-MM-DD') }]);
    setShowModal(false);
    setNewEvent({ title: '', description: '', date: '' });
  };

  const addNote = () => {
    setNotes([...notes, { ...newNote, date: selectedDate.format('YYYY-MM-DD') }]);
    setShowModal(false);
    setNewNote({ content: '', date: '' });
  };

  const toggleMode = () => {
    setIsEventMode(!isEventMode);
  };

  

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center mb-6">
          {/* Botón de mes anterior */}
          <button
            className="text-gray-600 hover:text-gray-800 mr-4 p-2 rounded-full transition-all duration-300 transform hover:bg-green-300 scale-110"
            onClick={handlePreviousMonth}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Nombre del mes con el año */}
          <h1 className="text-4xl font-bold text-green-600">{selectedDate.format('MMMM YYYY')}</h1>

          {/* Botón de mes siguiente */}
          <button
            className="text-gray-600 hover:text-gray-800 ml-4 p-2 rounded-full transition-all duration-300 transform hover:bg-green-300 scale-110"
            onClick={handleNextMonth}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 p-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600">{day}</div>
          ))}

          {createCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`h-14 flex items-center justify-center cursor-pointer rounded-md 
              ${
                day === moment().date() &&
                selectedDate.isSame(moment(), 'month') // Verifica que sea el día actual y el mes actual
                  ? 'bg-green-100'
                  : 'bg-white'
              } 
              ${day !== null ? 'hover:bg-green-200' : 'opacity-0'}`}
            onClick={() => day !== null && handleDayClick(day)}
          >
            <div
              className={`text-base font-medium ${
                day === moment().date() &&
                selectedDate.isSame(moment(), 'month') // Misma lógica para el texto
                  ? 'text-green-600'
                  : 'text-gray-700'
              }`}
            >
              {day || ''}
            </div>
          </div>
        ))}

        </div>

        {/* Modal for Events and Notes */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                {/* Encabezado dinámico */}
                <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
                  {isEventMode ? 'Agregar Evento' : 'Agregar Nota'}
                </h2>

                {/* Botones de alternancia */}
                <div className="flex justify-center gap-3 mb-4">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition 
                      ${isEventMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setIsEventMode(true)}
                  >
                    Evento
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition 
                      ${!isEventMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setIsEventMode(false)}
                  >
                    Nota
                  </button>
                </div>

                {/* Contenido del formulario */}
                <div>
                  {isEventMode ? (
                    <div className="space-y-3">
                      {/* Título del evento */}
                      <input
                        type="text"
                        name="title"
                        placeholder="Título del evento"
                        value={newEvent.title}
                        onChange={handleEventChange}
                        className="w-100 p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                      />

                      {/* Descripción del evento */}
                      <textarea
                        name="description"
                        placeholder="Descripción del evento"
                        value={newEvent.description}
                        onChange={handleEventChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      ></textarea>

                      {/* Hora de inicio y fin */}
                      <div className="flex gap-3">
                        <input
                          type="datetime-local"
                          name="start"
                          value={newEvent.start}
                          onChange={handleEventChange}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <input
                          type="datetime-local"
                          name="end"
                          value={newEvent.end}
                          onChange={handleEventChange}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                      </div>

                      {/* Botón para guardar */}
                      <button
                        className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition"
                        onClick={addEvent}
                      >
                        Guardar Evento
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Nota */}
                      <textarea
                        name="content"
                        placeholder="Escribe tu nota"
                        value={newNote.content}
                        onChange={handleNoteChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      ></textarea>

                      {/* Botón para guardar */}
                      <button
                        className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
                        onClick={addNote}
                      >
                        Guardar Nota
                      </button>
                    </div>
                  )}
                </div>

                {/* Botón de cierre */}
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}



        {/* List of Events and Notes */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Eventos y Notas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events
              .filter((event) => moment(event.date).isSame(selectedDate, 'month'))
              .map((event, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md">
                  <h4 className="font-semibold text-green-600 mb-2">{event.title}</h4>
                  <p className="text-gray-700 mb-2">{event.description}</p>
                  <p className="text-sm text-gray-500">{moment(event.date).format('DD/MM/YYYY')}</p>
                </div>
              ))}

            {notes
              .filter((note) => moment(note.date).isSame(selectedDate, 'month'))
              .map((note, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md">
                  <p className="text-gray-700">{note.content}</p>
                  <p className="text-sm text-gray-500">{moment(note.date).format('DD/MM/YYYY')}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;

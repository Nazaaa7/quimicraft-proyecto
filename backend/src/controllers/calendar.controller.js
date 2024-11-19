import { connectDB } from '../db/database.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, start, end, date, userId } = req.body;
    const connection = await connectDB();
    
    const [result] = await connection.execute(
      'INSERT INTO events (title, description, start_time, end_time, event_date, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, start, end, date, userId]
    );
    
    await connection.end();
    
    res.status(201).json({
      message: 'Event created successfully',
      eventId: result.insertId
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { content, date, userId } = req.body;
    const connection = await connectDB();
    
    const [result] = await connection.execute(
      'INSERT INTO notes (content, note_date, user_id) VALUES (?, ?, ?)',
      [content, date, userId]
    );
    
    await connection.end();
    
    res.status(201).json({
      message: 'Note created successfully',
      noteId: result.insertId
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

export const getEventsByMonthAndUser = async (req, res) => {
  try {
    const { year, month, userId } = req.params;
    const connection = await connectDB();
    
    const [events] = await connection.execute(
      'SELECT * FROM events WHERE YEAR(event_date) = ? AND MONTH(event_date) = ? AND user_id = ?',
      [year, month, userId]
    );
    
    await connection.end();
    
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

export const getNotesByMonthAndUser = async (req, res) => {
  try {
    const { year, month, userId } = req.params;
    const connection = await connectDB();
    
    const [notes] = await connection.execute(
      'SELECT * FROM notes WHERE YEAR(note_date) = ? AND MONTH(note_date) = ? AND user_id = ?',
      [year, month, userId]
    );
    
    await connection.end();
    
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

export const getDaysWithEvents = async (req, res) => {
  try {
    const { year, month, userId } = req.params;
    const connection = await connectDB();
    
    const [eventDays] = await connection.execute(
      `SELECT DISTINCT DAY(event_date) as day 
       FROM events 
       WHERE YEAR(event_date) = ? AND MONTH(event_date) = ? AND user_id = ?`,
      [year, month, userId]
    );
    
    const [noteDays] = await connection.execute(
      `SELECT DISTINCT DAY(note_date) as day 
       FROM notes 
       WHERE YEAR(note_date) = ? AND MONTH(note_date) = ? AND user_id = ?`,
      [year, month, userId]
    );
    
    await connection.end();
    
    res.status(200).json({
      eventDays: eventDays.map(d => d.day),
      noteDays: noteDays.map(d => d.day)
    });
  } catch (error) {
    console.error('Error fetching days with events/notes:', error);
    res.status(500).json({ message: 'Error fetching days', error: error.message });
  }
};
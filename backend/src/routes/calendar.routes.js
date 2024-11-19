import express from 'express';
import { 
  createEvent, 
  createNote, 
  getEventsByMonthAndUser, 
  getNotesByMonthAndUser,
  getDaysWithEvents
} from '../controllers/calendar.controller.js';

const router = express.Router();

// Event routes
router.post('/events', createEvent);
router.get('/events/:year/:month/:userId', getEventsByMonthAndUser);

// Note routes
router.post('/notes', createNote);
router.get('/notes/:year/:month/:userId', getNotesByMonthAndUser);

// Days with events/notes route
router.get('/days-with-content/:year/:month/:userId', getDaysWithEvents);

export default router;
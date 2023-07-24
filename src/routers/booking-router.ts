import { Router } from 'express';
import { updateBooking, createBooking, getBooking } from '@/controllers/booking-controller';
import { authenticateToken } from '@/middlewares';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).put('/', updateBooking).get('/', createBooking).post('/', getBooking);

export { bookingsRouter };
import { Response } from 'express';
import httpStatus from 'http-status';
import bookingService from '@/services/booking-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const booking = await bookingService.createBooking(userId, roomId);
    res.status(httpStatus.OK).send(booking);
  } catch (err) {
    if (err.name === 'NotFoundError') { return res.status(httpStatus.NOT_FOUND).send(err.message);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    try {
      const booking = await bookingService.getBooking(userId);
      res.status(httpStatus.OK).send(booking);
    } catch (err) {
      res.status(httpStatus.NOT_FOUND).send(err.message);
    }
  }

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const roomId = req.body.roomId;
  const bookingId = req.params.bookingId;
  
  try {
    const booking = await bookingService.updateBooking(Number(bookingId), roomId);
    res.status(httpStatus.OK).send(booking);
  } catch (err) {
    if (err.name === 'NotFoundError') {  return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}
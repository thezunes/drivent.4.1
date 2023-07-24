import { prisma } from '@/config';

async function getBooking(userId: number) {
  return prisma.booking.findFirst({ where: { userId }, include: { Room: true } });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({ data: { userId, roomId } });
}

async function updateBooking(bookingId: number, newRoomId: number) {
  return prisma.booking.update({ where: { id: bookingId }, data: { roomId: newRoomId } });
}

async function getAllBookingsByRoomId(roomId: number) {
    return prisma.booking.findMany({
      where: {roomId: roomId,},select: { id: true,Room: true,},
    });
  }

async function getRoomById(roomId: number) {
    return prisma.room.findFirst({ where: { id: roomId,},
    });
  }

const bookingRepository = { getBooking, createBooking, updateBooking, getAllBookingsByRoomId, getRoomById };

export default bookingRepository;
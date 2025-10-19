import a7a from 'express';
const bookingRouter = a7a['Router']();
import {
    getUserBookings,
    getBookingDetails,
    createOrder,
    verifyPayment
} from '../controllers/bookingController.js';
import { protect } from '../controllers/authController.js';
bookingRouter['get']('/', protect, getUserBookings), bookingRouter['get']('/:bookingId', protect, getBookingDetails), bookingRouter['post']('/create-order', protect, createOrder), bookingRouter['post']('/verify-payment', protect, verifyPayment);
export {
    bookingRouter
};
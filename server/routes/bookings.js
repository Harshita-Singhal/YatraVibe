const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBooking,
  updateBookingStatus,
  processPayment,
  getAllBookings,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);
router.post('/:id/pay', protect, processPayment);
router.get('/', protect, authorize('admin'), getAllBookings);

module.exports = router;

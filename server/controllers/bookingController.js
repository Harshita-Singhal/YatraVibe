const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.user._id,
    };

    // Set contact info from user if not provided
    if (!bookingData.contactInfo || !bookingData.contactInfo.name) {
      bookingData.contactInfo = {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone || '',
      };
    }

    const booking = await Booking.create(bookingData);

    // Award eco points if eco-friendly booking
    if (booking.isEcoFriendly) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { points: 5, 'ecoChoices.publicTransport': 1 },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('place', 'name location photos')
        .populate('guide', 'name avatar guideDetails')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Booking.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('place', 'name location photos')
      .populate('guide', 'name avatar phone guideDetails')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Only the booking owner, assigned guide, or admin can view
    if (
      req.user.role !== 'admin' &&
      booking.user._id.toString() !== req.user._id.toString() &&
      (!booking.guide || booking.guide._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, cancellationReason } = req.body;

    const validStatuses = ['confirmed', 'cancelled', 'completed', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Only owner or admin can update
    if (
      req.user.role !== 'admin' &&
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking',
      });
    }

    booking.status = status;
    if (status === 'cancelled' && cancellationReason) {
      booking.cancellationReason = cancellationReason;
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking ${status}`,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process payment (placeholder)
// @route   POST /api/bookings/:id/pay
// @access  Private
const processPayment = async (req, res, next) => {
  try {
    const { paymentMethod, transactionId } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (booking.payment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed',
      });
    }

    // Placeholder for actual payment gateway integration
    // In production, integrate with Razorpay/Stripe SDK here
    booking.payment = {
      method: paymentMethod || 'razorpay',
      transactionId: transactionId || `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'completed',
      paidAt: new Date(),
    };
    booking.status = 'confirmed';

    await booking.save();

    // Award points for booking
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { points: 15 },
    });

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        bookingId: booking._id,
        transactionId: booking.payment.transactionId,
        amount: booking.totalAmount,
        currency: booking.currency,
        status: booking.payment.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings/admin/all
// @access  Private (admin)
const getAllBookings = async (req, res, next) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('user', 'name email phone')
        .populate('place', 'name location')
        .populate('guide', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Booking.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBooking,
  updateBookingStatus,
  processPayment,
  getAllBookings,
};

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: [true, 'Booking type is required'],
      enum: ['hotel', 'tour', 'activity', 'transport'],
    },
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    itemId: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
    },
    guests: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'],
      default: 'pending',
    },
    payment: {
      method: {
        type: String,
        enum: ['razorpay', 'stripe', 'cod', 'upi', 'wallet'],
        default: 'razorpay',
      },
      transactionId: { type: String, default: '' },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
      },
      paidAt: { type: Date },
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contactInfo: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    specialRequests: {
      type: String,
      maxlength: 500,
      default: '',
    },
    cancellationReason: {
      type: String,
      default: '',
    },
    isEcoFriendly: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ startDate: 1 });
bookingSchema.index({ type: 1 });

module.exports = mongoose.model('Booking', bookingSchema);

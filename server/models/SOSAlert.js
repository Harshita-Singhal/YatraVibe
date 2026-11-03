const mongoose = require('mongoose');

const sosAlertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      coordinates: {
        lat: {
          type: Number,
          required: [true, 'Latitude is required'],
          min: -90,
          max: 90,
        },
        lng: {
          type: Number,
          required: [true, 'Longitude is required'],
          min: -180,
          max: 180,
        },
      },
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
    },
    emergencyType: {
      type: String,
      enum: ['medical', 'safety', 'lost', 'natural_disaster', 'other'],
      default: 'other',
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'responding', 'resolved', 'false_alarm'],
      default: 'active',
    },
    respondedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        respondedAt: {
          type: Date,
          default: Date.now,
        },
        message: { type: String, default: '' },
      },
    ],
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
    contactInfo: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      emergencyContact: { type: String, default: '' },
    },
    notifiedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    timeline: [
      {
        action: { type: String },
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        timestamp: { type: Date, default: Date.now },
        note: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

sosAlertSchema.index({ status: 1 });
sosAlertSchema.index({ user: 1 });
sosAlertSchema.index({
  'location.coordinates.lat': 1,
  'location.coordinates.lng': 1,
});
sosAlertSchema.index({ createdAt: -1 });

module.exports = mongoose.model('SOSAlert', sosAlertSchema);

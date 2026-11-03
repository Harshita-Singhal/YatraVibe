const mongoose = require('mongoose');

const questSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Quest title is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Quest type is required'],
      enum: ['visit', 'photo', 'review', 'eco', 'cultural', 'social'],
    },
    points: {
      type: Number,
      required: [true, 'Points are required'],
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'legendary'],
      default: 'easy',
    },
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge',
    },
    requirements: {
      description: { type: String, default: '' },
      targetCount: { type: Number, default: 1 },
      targetPlace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
      },
      targetCategory: { type: String, default: '' },
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        progress: { type: Number, default: 0 },
        status: {
          type: String,
          enum: ['in_progress', 'completed', 'abandoned'],
          default: 'in_progress',
        },
        startedAt: { type: Date, default: Date.now },
        completedAt: { type: Date },
      },
    ],
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    maxParticipants: {
      type: Number,
      default: 0, // 0 means unlimited
    },
    location: {
      state: { type: String, default: '' },
      city: { type: String, default: '' },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

questSchema.index({ type: 1, isActive: 1 });
questSchema.index({ difficulty: 1 });
questSchema.index({ points: -1 });

module.exports = mongoose.model('Quest', questSchema);

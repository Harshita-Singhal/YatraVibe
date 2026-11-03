const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: 2000,
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'location', 'system'],
    default: 'text',
  },
  readBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['tourist', 'local_guide'],
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    messages: [messageSchema],
    topic: {
      type: String,
      trim: true,
      default: '',
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'archived'],
      default: 'active',
    },
    rating: {
      score: { type: Number, min: 1, max: 5 },
      feedback: { type: String, default: '' },
      ratedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    lastMessage: {
      content: { type: String, default: '' },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      timestamp: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ 'participants.user': 1 });
chatSchema.index({ status: 1 });
chatSchema.index({ updatedAt: -1 });

module.exports = mongoose.model('Chat', chatSchema);

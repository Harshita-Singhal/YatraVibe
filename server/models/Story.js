const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: 50,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    mediaType: {
      type: String,
      enum: ['text', 'audio', 'video', 'mixed'],
      default: 'text',
    },
    media: [
      {
        type: {
          type: String,
          enum: ['image', 'audio', 'video'],
        },
        url: { type: String, required: true },
        publicId: { type: String, default: '' },
        duration: { type: Number }, // for audio/video in seconds
        thumbnail: { type: String, default: '' },
        caption: { type: String, default: '' },
      },
    ],
    culturalContext: {
      tradition: { type: String, default: '' },
      language: { type: String, default: '' },
      festival: { type: String, default: '' },
      historicalPeriod: { type: String, default: '' },
    },
    tags: [{ type: String, trim: true }],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

storySchema.index({ place: 1 });
storySchema.index({ author: 1 });
storySchema.index({ isApproved: 1, isFeatured: 1 });
storySchema.index({ likeCount: -1 });
storySchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Story', storySchema);

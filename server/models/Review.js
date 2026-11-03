const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      required: [true, 'Target type is required'],
      enum: ['place', 'hotel', 'local_guide'],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Target ID is required'],
      refPath: 'targetModel',
    },
    targetModel: {
      type: String,
      required: true,
      enum: ['Place', 'User'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    photos: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    helpful: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    helpfulCount: {
      type: Number,
      default: 0,
    },
    response: {
      content: { type: String, default: '' },
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      respondedAt: { type: Date },
    },
    visitDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
        enum: [
          'family_friendly',
          'solo_travel',
          'budget',
          'luxury',
          'photography',
          'food',
          'adventure',
          'cultural',
          'romantic',
          'accessible',
        ],
      },
    ],
    isVerified: {
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

// Prevent duplicate reviews from same user for same target
reviewSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });
reviewSchema.index({ targetId: 1, targetType: 1 });
reviewSchema.index({ rating: -1 });

// Pre-save: set targetModel based on targetType
reviewSchema.pre('save', function (next) {
  if (this.targetType === 'place' || this.targetType === 'hotel') {
    this.targetModel = 'Place';
  } else if (this.targetType === 'local_guide') {
    this.targetModel = 'User';
  }
  next();
});

module.exports = mongoose.model('Review', reviewSchema);

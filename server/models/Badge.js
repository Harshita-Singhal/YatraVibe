const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Badge name is required'],
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    icon: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    category: {
      type: String,
      required: true,
      enum: ['eco', 'explorer', 'social', 'cultural', 'foodie', 'adventurer', 'helper', 'special'],
    },
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
      default: 'bronze',
    },
    criteria: {
      type: { type: String, default: '' },
      threshold: { type: Number, default: 1 },
      description: { type: String, default: '' },
    },
    reward: {
      discountPercent: { type: Number, default: 0, min: 0, max: 100 },
      points: { type: Number, default: 0 },
      description: { type: String, default: '' },
    },
    earnedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    totalEarned: {
      type: Number,
      default: 0,
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

badgeSchema.index({ category: 1 });
badgeSchema.index({ tier: 1 });

module.exports = mongoose.model('Badge', badgeSchema);

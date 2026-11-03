const mongoose = require('mongoose');

const hiddenGemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: 20,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'food_spot',
        'viewpoint',
        'local_market',
        'cultural_site',
        'nature_trail',
        'artisan_workshop',
        'street_art',
        'hidden_waterfall',
        'other',
      ],
    },
    location: {
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      address: { type: String, trim: true, default: '' },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
      landmark: { type: String, trim: true, default: '' },
    },
    photos: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        caption: { type: String, default: '' },
      },
    ],
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewNote: {
      type: String,
      default: '',
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    upvoteCount: {
      type: Number,
      default: 0,
    },
    tips: {
      type: String,
      maxlength: 500,
      default: '',
    },
    bestTime: {
      type: String,
      default: '',
    },
    tags: [{ type: String, trim: true }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

hiddenGemSchema.index({ status: 1 });
hiddenGemSchema.index({ 'location.state': 1, 'location.city': 1 });
hiddenGemSchema.index({ upvoteCount: -1 });
hiddenGemSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('HiddenGem', hiddenGemSchema);

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Place name is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'temple',
        'beach',
        'mountain',
        'heritage',
        'wildlife',
        'adventure',
        'food',
        'market',
        'museum',
        'park',
        'lake',
        'fort',
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
      address: {
        type: String,
        trim: true,
        default: '',
      },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    photos: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        caption: { type: String, default: '' },
      },
    ],
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    bestTimeToVisit: {
      months: [{ type: String }],
      season: {
        type: String,
        enum: ['summer', 'winter', 'monsoon', 'spring', 'autumn', 'all_year'],
        default: 'all_year',
      },
    },
    entryFee: {
      indian: { type: Number, default: 0 },
      foreigner: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
    },
    timings: {
      open: { type: String, default: '' },
      close: { type: String, default: '' },
      closedOn: [{ type: String }],
    },
    facilities: [
      {
        type: String,
        enum: [
          'parking',
          'restroom',
          'restaurant',
          'guide_available',
          'wheelchair_accessible',
          'wifi',
          'atm',
          'medical',
          'locker',
          'photography_allowed',
        ],
      },
    ],
    tags: [{ type: String, trim: true }],
    crowdLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'very_high'],
      default: 'moderate',
    },
    ecoFriendly: {
      type: Boolean,
      default: false,
    },
    addedBy: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for reviews
placeSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'targetId',
  match: { targetType: 'place' },
});

// Index for location-based queries
placeSchema.index({ 'location.state': 1, 'location.city': 1 });
placeSchema.index({ category: 1 });
placeSchema.index({ 'rating.average': -1 });
placeSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Place', placeSchema);

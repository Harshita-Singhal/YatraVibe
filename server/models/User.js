const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['tourist', 'local_guide', 'admin'],
      default: 'tourist',
    },
    avatar: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      maxlength: 500,
      default: '',
    },
    location: {
      state: { type: String, default: '' },
      city: { type: String, default: '' },
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    ecoScore: {
      type: Number,
      default: 0,
      min: 0,
    },
    badges: [
      {
        badge: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Badge',
        },
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    completedQuests: [
      {
        quest: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quest',
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    interests: [
      {
        type: String,
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
          'photography',
          'trekking',
          'culture',
          'nightlife',
        ],
      },
    ],
    languages: [{ type: String, trim: true }],
    // Local guide specific fields
    isVerifiedGuide: {
      type: Boolean,
      default: false,
    },
    guideDetails: {
      experience: { type: Number, default: 0 },
      specializations: [{ type: String }],
      pricePerHour: { type: Number, default: 0 },
      availability: {
        type: String,
        enum: ['available', 'busy', 'offline'],
        default: 'offline',
      },
      rating: { type: Number, default: 0, min: 0, max: 5 },
      totalReviews: { type: Number, default: 0 },
      verificationDocuments: [{ type: String }],
    },
    ecoChoices: {
      publicTransport: { type: Number, default: 0 },
      localFood: { type: Number, default: 0 },
      plasticFree: { type: Number, default: 0 },
      treePlanting: { type: Number, default: 0 },
      culturalRespect: { type: Number, default: 0 },
    },
    savedPlaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate eco score from choices
userSchema.methods.calculateEcoScore = function () {
  const choices = this.ecoChoices;
  this.ecoScore =
    choices.publicTransport * 5 +
    choices.localFood * 3 +
    choices.plasticFree * 4 +
    choices.treePlanting * 10 +
    choices.culturalRespect * 3;
  return this.ecoScore;
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);

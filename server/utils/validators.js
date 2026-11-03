const { body, param, query } = require('express-validator');

const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['tourist', 'local_guide', 'admin'])
    .withMessage('Role must be tourist, local_guide, or admin'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const placeValidation = [
  body('name').trim().notEmpty().withMessage('Place name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
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
    ])
    .withMessage('Invalid category'),
  body('location.state').trim().notEmpty().withMessage('State is required'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.coordinates.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('location.coordinates.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
];

const hiddenGemValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  body('location.state').trim().notEmpty().withMessage('State is required'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'food_spot',
      'viewpoint',
      'local_market',
      'cultural_site',
      'nature_trail',
      'artisan_workshop',
      'street_art',
      'hidden_waterfall',
      'other',
    ])
    .withMessage('Invalid category'),
];

const bookingValidation = [
  body('type')
    .notEmpty()
    .withMessage('Booking type is required')
    .isIn(['hotel', 'tour', 'activity', 'transport'])
    .withMessage('Invalid booking type'),
  body('itemName').trim().notEmpty().withMessage('Item name is required'),
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Invalid start date format'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format'),
  body('totalAmount')
    .notEmpty()
    .withMessage('Total amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('guests')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Guests must be at least 1'),
];

const reviewValidation = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ min: 10 })
    .withMessage('Comment must be at least 10 characters'),
  body('targetType')
    .notEmpty()
    .withMessage('Target type is required')
    .isIn(['place', 'hotel', 'local_guide'])
    .withMessage('Invalid target type'),
  body('targetId')
    .notEmpty()
    .withMessage('Target ID is required')
    .isMongoId()
    .withMessage('Invalid target ID'),
];

const storyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('place')
    .notEmpty()
    .withMessage('Place reference is required')
    .isMongoId()
    .withMessage('Invalid place ID'),
  body('mediaType')
    .optional()
    .isIn(['text', 'audio', 'video', 'mixed'])
    .withMessage('Invalid media type'),
];

const questValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('type')
    .notEmpty()
    .withMessage('Quest type is required')
    .isIn(['visit', 'photo', 'review', 'eco', 'cultural', 'social'])
    .withMessage('Invalid quest type'),
  body('points')
    .notEmpty()
    .withMessage('Points are required')
    .isInt({ min: 1 })
    .withMessage('Points must be at least 1'),
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard', 'legendary'])
    .withMessage('Invalid difficulty'),
];

const sosValidation = [
  body('location.coordinates.lat')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('location.coordinates.lng')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  body('emergencyType')
    .optional()
    .isIn(['medical', 'safety', 'lost', 'natural_disaster', 'other'])
    .withMessage('Invalid emergency type'),
];

const mongoIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

const paginationQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

module.exports = {
  registerValidation,
  loginValidation,
  placeValidation,
  hiddenGemValidation,
  bookingValidation,
  reviewValidation,
  storyValidation,
  questValidation,
  sosValidation,
  mongoIdParam,
  paginationQuery,
};

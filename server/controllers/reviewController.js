const Review = require('../models/Review');
const Place = require('../models/Place');
const User = require('../models/User');

// @desc    Add review for place or local guide
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    const { targetType, targetId, rating, comment, photos } = req.body;

    const targetModel = targetType === 'local_guide' ? 'User' : 'Place';

    const review = await Review.create({
      user: req.user._id,
      targetType,
      targetId,
      targetModel,
      rating: Number(rating),
      comment,
      photos: photos || [],
    });

    // Update target rating average if Place
    if (targetType === 'place') {
      const allReviews = await Review.find({ targetId, targetType: 'place' });
      const avg = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
      await Place.findByIdAndUpdate(targetId, {
        rating: Math.round(avg * 10) / 10,
        reviewCount: allReviews.length,
      });
    }

    // Award review reward points
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 25 } });

    res.status(201).json({
      success: true,
      message: 'Review posted! +25 explorer points rewarded.',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for specific target
// @route   GET /api/reviews/:targetType/:targetId
// @access  Public
const getTargetReviews = async (req, res, next) => {
  try {
    const { targetType, targetId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ targetType, targetId })
      .populate('user', 'name avatar role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Review.countDocuments({ targetType, targetId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getTargetReviews,
};

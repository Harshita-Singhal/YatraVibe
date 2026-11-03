const Badge = require('../models/Badge');
const User = require('../models/User');

// @desc    Create a new badge
// @route   POST /api/badges
// @access  Private (admin)
const createBadge = async (req, res, next) => {
  try {
    const badge = await Badge.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Badge created successfully',
      data: badge,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all badges
// @route   GET /api/badges
// @access  Public
const getBadges = async (req, res, next) => {
  try {
    const { category, tier } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (tier) filter.tier = tier;

    const badges = await Badge.find(filter).sort({ tier: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single badge
// @route   GET /api/badges/:id
// @access  Public
const getBadge = async (req, res, next) => {
  try {
    const badge = await Badge.findById(req.params.id).populate(
      'earnedBy',
      'name avatar'
    );

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found',
      });
    }

    res.status(200).json({
      success: true,
      data: badge,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a badge
// @route   PUT /api/badges/:id
// @access  Private (admin)
const updateBadge = async (req, res, next) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Badge updated',
      data: badge,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a badge
// @route   DELETE /api/badges/:id
// @access  Private (admin)
const deleteBadge = async (req, res, next) => {
  try {
    const badge = await Badge.findById(req.params.id);

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found',
      });
    }

    badge.isActive = false;
    await badge.save();

    res.status(200).json({
      success: true,
      message: 'Badge deleted',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Award badge to user manually
// @route   POST /api/badges/:id/award/:userId
// @access  Private (admin)
const awardBadge = async (req, res, next) => {
  try {
    const { id, userId } = req.params;

    const badge = await Badge.findById(id);
    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const alreadyHas = user.badges.some(
      (b) => b.badge.toString() === id
    );

    if (alreadyHas) {
      return res.status(400).json({
        success: false,
        message: 'User already has this badge',
      });
    }

    user.badges.push({ badge: badge._id });
    user.points += badge.reward.points || 0;
    await user.save();

    badge.earnedBy.push(user._id);
    badge.totalEarned += 1;
    await badge.save();

    res.status(200).json({
      success: true,
      message: `Badge "${badge.name}" awarded to ${user.name}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's badges
// @route   GET /api/badges/user/:userId
// @access  Public
const getUserBadges = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('name badges')
      .populate('badges.badge');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      count: user.badges.length,
      data: user.badges,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBadge,
  getBadges,
  getBadge,
  updateBadge,
  deleteBadge,
  awardBadge,
  getUserBadges,
};

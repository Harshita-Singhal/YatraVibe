const User = require('../models/User');
const Badge = require('../models/Badge');

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('badges.badge')
      .populate('savedPlaces')
      .select('-completedQuests');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'name',
      'phone',
      'bio',
      'location',
      'interests',
      'languages',
      'avatar',
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).populate('badges.badge');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update guide details (for local guides)
// @route   PUT /api/users/guide-details
// @access  Private (local_guide)
const updateGuideDetails = async (req, res, next) => {
  try {
    if (req.user.role !== 'local_guide') {
      return res.status(403).json({
        success: false,
        message: 'Only local guides can update guide details',
      });
    }

    const { experience, specializations, pricePerHour, availability } = req.body;

    const updateData = {};
    if (experience !== undefined) updateData['guideDetails.experience'] = experience;
    if (specializations !== undefined) updateData['guideDetails.specializations'] = specializations;
    if (pricePerHour !== undefined) updateData['guideDetails.pricePerHour'] = pricePerHour;
    if (availability !== undefined) updateData['guideDetails.availability'] = availability;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Guide details updated',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify a local guide (admin only)
// @route   PUT /api/users/:id/verify-guide
// @access  Private (admin)
const verifyGuide = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role !== 'local_guide') {
      return res.status(400).json({
        success: false,
        message: 'User is not a local guide',
      });
    }

    user.isVerifiedGuide = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Guide verified successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all local guides
// @route   GET /api/users/guides
// @access  Public
const getLocalGuides = async (req, res, next) => {
  try {
    const { state, city, available, page = 1, limit = 20 } = req.query;

    const filter = {
      role: 'local_guide',
      isVerifiedGuide: true,
      isActive: true,
    };

    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (available === 'true') filter['guideDetails.availability'] = 'available';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [guides, total] = await Promise.all([
      User.find(filter)
        .select('-completedQuests -savedPlaces -ecoChoices')
        .populate('badges.badge')
        .sort({ 'guideDetails.rating': -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: guides.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: guides,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update eco choices
// @route   PUT /api/users/eco-choices
// @access  Private
const updateEcoChoices = async (req, res, next) => {
  try {
    const { publicTransport, localFood, plasticFree, treePlanting, culturalRespect } = req.body;

    const user = await User.findById(req.user._id);

    if (publicTransport) user.ecoChoices.publicTransport += publicTransport;
    if (localFood) user.ecoChoices.localFood += localFood;
    if (plasticFree) user.ecoChoices.plasticFree += plasticFree;
    if (treePlanting) user.ecoChoices.treePlanting += treePlanting;
    if (culturalRespect) user.ecoChoices.culturalRespect += culturalRespect;

    user.calculateEcoScore();
    await user.save();

    // Check and award eco badges
    await checkAndAwardEcoBadges(user);

    res.status(200).json({
      success: true,
      message: 'Eco choices updated',
      data: {
        ecoChoices: user.ecoChoices,
        ecoScore: user.ecoScore,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to check and award eco badges
const checkAndAwardEcoBadges = async (user) => {
  try {
    const ecoBadges = await Badge.find({ category: 'eco', isActive: true });

    for (const badge of ecoBadges) {
      const alreadyHas = user.badges.some(
        (b) => b.badge.toString() === badge._id.toString()
      );

      if (!alreadyHas && user.ecoScore >= badge.criteria.threshold) {
        user.badges.push({ badge: badge._id });
        user.points += badge.reward.points || 0;
        badge.earnedBy.push(user._id);
        badge.totalEarned += 1;
        await badge.save();
      }
    }

    await user.save();
  } catch (error) {
    console.error('Error checking eco badges:', error.message);
  }
};

// @desc    Save/unsave a place
// @route   PUT /api/users/saved-places/:placeId
// @access  Private
const toggleSavedPlace = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const placeId = req.params.placeId;

    const index = user.savedPlaces.indexOf(placeId);

    if (index > -1) {
      user.savedPlaces.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: 'Place removed from saved list',
        saved: false,
      });
    }

    user.savedPlaces.push(placeId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Place saved successfully',
      saved: true,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get leaderboard
// @route   GET /api/users/leaderboard
// @access  Public
const getLeaderboard = async (req, res, next) => {
  try {
    const { type = 'points', limit = 20 } = req.query;

    let sortField = 'points';
    if (type === 'eco') sortField = 'ecoScore';

    const leaders = await User.find({ isActive: true })
      .select('name avatar points ecoScore badges role')
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: leaders.map((user, index) => ({
        rank: index + 1,
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          points: user.points,
          ecoScore: user.ecoScore,
          badgeCount: user.badges.length,
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private (admin)
const getAllUsers = async (req, res, next) => {
  try {
    const { role, page = 1, limit = 20, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-completedQuests -savedPlaces')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate user (admin)
// @route   PUT /api/users/:id/deactivate
// @access  Private (admin)
const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  updateGuideDetails,
  verifyGuide,
  getLocalGuides,
  updateEcoChoices,
  toggleSavedPlace,
  getLeaderboard,
  getAllUsers,
  deactivateUser,
};

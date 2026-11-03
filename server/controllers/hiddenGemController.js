const HiddenGem = require('../models/HiddenGem');
const User = require('../models/User');

// @desc    Submit a new hidden gem
// @route   POST /api/hidden-gems
// @access  Private
const submitHiddenGem = async (req, res, next) => {
  try {
    const gemData = {
      ...req.body,
      submittedBy: req.user._id,
      status: 'pending',
    };

    const gem = await HiddenGem.create(gemData);

    // Award points for submitting
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

    res.status(201).json({
      success: true,
      message: 'Hidden gem submitted for review',
      data: gem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all approved hidden gems
// @route   GET /api/hidden-gems
// @access  Public
const getHiddenGems = async (req, res, next) => {
  try {
    const {
      category,
      state,
      city,
      search,
      sortBy = 'upvotes',
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { status: 'approved', isActive: true };

    if (category) filter.category = category;
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (search) {
      filter.$text = { $search: search };
    }

    let sortOption = {};
    switch (sortBy) {
      case 'upvotes':
        sortOption = { upvoteCount: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { upvoteCount: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [gems, total] = await Promise.all([
      HiddenGem.find(filter)
        .populate('submittedBy', 'name avatar')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      HiddenGem.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: gems.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: gems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single hidden gem
// @route   GET /api/hidden-gems/:id
// @access  Public
const getHiddenGem = async (req, res, next) => {
  try {
    const gem = await HiddenGem.findById(req.params.id)
      .populate('submittedBy', 'name avatar role')
      .populate('reviewedBy', 'name');

    if (!gem) {
      return res.status(404).json({
        success: false,
        message: 'Hidden gem not found',
      });
    }

    res.status(200).json({
      success: true,
      data: gem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote a hidden gem
// @route   PUT /api/hidden-gems/:id/upvote
// @access  Private
const upvoteHiddenGem = async (req, res, next) => {
  try {
    const gem = await HiddenGem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({
        success: false,
        message: 'Hidden gem not found',
      });
    }

    if (gem.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Can only upvote approved hidden gems',
      });
    }

    const userId = req.user._id;
    const alreadyUpvoted = gem.upvotes.includes(userId);

    if (alreadyUpvoted) {
      gem.upvotes = gem.upvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      gem.upvoteCount = Math.max(0, gem.upvoteCount - 1);
    } else {
      gem.upvotes.push(userId);
      gem.upvoteCount += 1;
    }

    await gem.save();

    res.status(200).json({
      success: true,
      message: alreadyUpvoted ? 'Upvote removed' : 'Upvoted successfully',
      upvoted: !alreadyUpvoted,
      upvoteCount: gem.upvoteCount,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve/reject a hidden gem (admin)
// @route   PUT /api/hidden-gems/:id/review
// @access  Private (admin)
const reviewHiddenGem = async (req, res, next) => {
  try {
    const { status, reviewNote } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be approved or rejected',
      });
    }

    const gem = await HiddenGem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({
        success: false,
        message: 'Hidden gem not found',
      });
    }

    gem.status = status;
    gem.reviewedBy = req.user._id;
    gem.reviewNote = reviewNote || '';
    await gem.save();

    // Award bonus points if approved
    if (status === 'approved') {
      await User.findByIdAndUpdate(gem.submittedBy, {
        $inc: { points: 25 },
      });
    }

    res.status(200).json({
      success: true,
      message: `Hidden gem ${status}`,
      data: gem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending hidden gems (admin)
// @route   GET /api/hidden-gems/pending
// @access  Private (admin)
const getPendingGems = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [gems, total] = await Promise.all([
      HiddenGem.find({ status: 'pending' })
        .populate('submittedBy', 'name avatar role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      HiddenGem.countDocuments({ status: 'pending' }),
    ]);

    res.status(200).json({
      success: true,
      count: gems.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: gems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a hidden gem
// @route   PUT /api/hidden-gems/:id
// @access  Private (owner or admin)
const updateHiddenGem = async (req, res, next) => {
  try {
    let gem = await HiddenGem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({
        success: false,
        message: 'Hidden gem not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      gem.submittedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this hidden gem',
      });
    }

    // If non-admin edits, reset to pending
    if (req.user.role !== 'admin') {
      req.body.status = 'pending';
    }

    gem = await HiddenGem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Hidden gem updated',
      data: gem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a hidden gem
// @route   DELETE /api/hidden-gems/:id
// @access  Private (owner or admin)
const deleteHiddenGem = async (req, res, next) => {
  try {
    const gem = await HiddenGem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({
        success: false,
        message: 'Hidden gem not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      gem.submittedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this hidden gem',
      });
    }

    gem.isActive = false;
    await gem.save();

    res.status(200).json({
      success: true,
      message: 'Hidden gem deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitHiddenGem,
  getHiddenGems,
  getHiddenGem,
  upvoteHiddenGem,
  reviewHiddenGem,
  getPendingGems,
  updateHiddenGem,
  deleteHiddenGem,
};

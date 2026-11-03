const Quest = require('../models/Quest');
const User = require('../models/User');
const Badge = require('../models/Badge');

// @desc    Create a new quest
// @route   POST /api/quests
// @access  Private (admin)
const createQuest = async (req, res, next) => {
  try {
    const questData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const quest = await Quest.create(questData);

    res.status(201).json({
      success: true,
      message: 'Quest created successfully',
      data: quest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all active quests
// @route   GET /api/quests
// @access  Public
const getQuests = async (req, res, next) => {
  try {
    const { type, difficulty, state, city, page = 1, limit = 20 } = req.query;

    const filter = { isActive: true };

    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [quests, total] = await Promise.all([
      Quest.find(filter)
        .populate('badge', 'name icon tier')
        .select('-participants')
        .sort({ points: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Quest.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: quests.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: quests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quest
// @route   GET /api/quests/:id
// @access  Public
const getQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findById(req.params.id)
      .populate('badge')
      .populate('requirements.targetPlace', 'name location')
      .populate('participants.user', 'name avatar');

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found',
      });
    }

    res.status(200).json({
      success: true,
      data: quest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Join a quest
// @route   POST /api/quests/:id/join
// @access  Private
const joinQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findById(req.params.id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found',
      });
    }

    if (!quest.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Quest is no longer active',
      });
    }

    // Check if already joined
    const alreadyJoined = quest.participants.find(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: 'You have already joined this quest',
      });
    }

    // Check max participants
    if (
      quest.maxParticipants > 0 &&
      quest.participants.length >= quest.maxParticipants
    ) {
      return res.status(400).json({
        success: false,
        message: 'Quest is full',
      });
    }

    quest.participants.push({
      user: req.user._id,
      progress: 0,
      status: 'in_progress',
    });

    await quest.save();

    res.status(200).json({
      success: true,
      message: 'Joined quest successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quest progress
// @route   PUT /api/quests/:id/progress
// @access  Private
const updateProgress = async (req, res, next) => {
  try {
    const { progress } = req.body;
    const quest = await Quest.findById(req.params.id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found',
      });
    }

    const participant = quest.participants.find(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (!participant) {
      return res.status(400).json({
        success: false,
        message: 'You have not joined this quest',
      });
    }

    if (participant.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quest already completed',
      });
    }

    participant.progress = Math.min(
      progress,
      quest.requirements.targetCount || 1
    );

    // Check if quest completed
    if (participant.progress >= (quest.requirements.targetCount || 1)) {
      participant.status = 'completed';
      participant.completedAt = new Date();

      // Award points
      const user = await User.findById(req.user._id);
      user.points += quest.points;
      user.completedQuests.push({
        quest: quest._id,
        completedAt: new Date(),
      });

      // Award badge if associated
      if (quest.badge) {
        const alreadyHasBadge = user.badges.some(
          (b) => b.badge.toString() === quest.badge.toString()
        );

        if (!alreadyHasBadge) {
          user.badges.push({ badge: quest.badge });

          await Badge.findByIdAndUpdate(quest.badge, {
            $push: { earnedBy: user._id },
            $inc: { totalEarned: 1 },
          });
        }
      }

      await user.save();
    }

    await quest.save();

    res.status(200).json({
      success: true,
      message:
        participant.status === 'completed'
          ? 'Quest completed! Points awarded.'
          : 'Progress updated',
      data: {
        progress: participant.progress,
        status: participant.status,
        targetCount: quest.requirements.targetCount || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a quest
// @route   PUT /api/quests/:id
// @access  Private (admin)
const updateQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quest updated',
      data: quest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a quest
// @route   DELETE /api/quests/:id
// @access  Private (admin)
const deleteQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findById(req.params.id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found',
      });
    }

    quest.isActive = false;
    await quest.save();

    res.status(200).json({
      success: true,
      message: 'Quest deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuest,
  getQuests,
  getQuest,
  joinQuest,
  updateProgress,
  updateQuest,
  deleteQuest,
};

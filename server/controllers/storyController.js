const Story = require('../models/Story');
const Place = require('../models/Place');
const User = require('../models/User');

// @desc    Create a new cultural story
// @route   POST /api/stories
// @access  Private (tourist, local_guide, admin)
const createStory = async (req, res, next) => {
  try {
    const { title, content, placeId, mediaType, media, culturalContext, tags } = req.body;

    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    const story = await Story.create({
      title,
      content,
      author: req.user._id,
      place: placeId,
      mediaType: mediaType || 'text',
      media: media || [],
      culturalContext: culturalContext || {},
      tags: tags || [],
    });

    // Reward author with points
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 50 } });

    res.status(201).json({
      success: true,
      message: 'Cultural story published successfully (+50 points earned)',
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all stories with filters & pagination
// @route   GET /api/stories
// @access  Public
const getStories = async (req, res, next) => {
  try {
    const { placeId, mediaType, search, page = 1, limit = 10 } = req.query;
    const filter = { isPublished: true };

    if (placeId) filter.place = placeId;
    if (mediaType) filter.mediaType = mediaType;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const stories = await Story.find(filter)
      .populate('author', 'name avatar role')
      .populate('place', 'name location images category')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Story.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: stories,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get story by ID
// @route   GET /api/stories/:id
// @access  Public
const getStoryById = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('author', 'name avatar role bio location')
      .populate('place', 'name location images category');

    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    // Increment views
    story.views = (story.views || 0) + 1;
    await story.save();

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like / Unlike story
// @route   POST /api/stories/:id/like
// @access  Private
const toggleLikeStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    const userId = req.user._id.toString();
    const hasLiked = story.likes.some((id) => id.toString() === userId);

    if (hasLiked) {
      story.likes = story.likes.filter((id) => id.toString() !== userId);
    } else {
      story.likes.push(req.user._id);
    }

    story.likeCount = story.likes.length;
    await story.save();

    res.status(200).json({
      success: true,
      liked: !hasLiked,
      likeCount: story.likeCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStory,
  getStories,
  getStoryById,
  toggleLikeStory,
};

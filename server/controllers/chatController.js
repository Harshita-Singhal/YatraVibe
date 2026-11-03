const Chat = require('../models/Chat');
const User = require('../models/User');

// @desc    Start a new chat session with a local guide
// @route   POST /api/chat/start
// @access  Private
const startChat = async (req, res, next) => {
  try {
    const { guideId, topic, placeId } = req.body;

    if (!guideId) {
      return res.status(400).json({
        success: false,
        message: 'Guide ID is required',
      });
    }

    const guide = await User.findById(guideId);
    if (!guide || guide.role !== 'local_guide') {
      return res.status(404).json({
        success: false,
        message: 'Local guide not found',
      });
    }

    if (!guide.isVerifiedGuide) {
      return res.status(400).json({
        success: false,
        message: 'Guide is not verified',
      });
    }

    // Check for existing active chat between these users
    const existingChat = await Chat.findOne({
      'participants.user': { $all: [req.user._id, guideId] },
      status: 'active',
    });

    if (existingChat) {
      return res.status(200).json({
        success: true,
        message: 'Existing active chat found',
        data: existingChat,
      });
    }

    const chat = await Chat.create({
      participants: [
        { user: req.user._id, role: 'tourist' },
        { user: guideId, role: 'local_guide' },
      ],
      topic: topic || '',
      place: placeId || undefined,
      messages: [
        {
          sender: req.user._id,
          content: `Hi! I'd like to chat about ${topic || 'local travel tips'}.`,
          messageType: 'system',
        },
      ],
    });

    const populatedChat = await Chat.findById(chat._id)
      .populate('participants.user', 'name avatar role')
      .populate('place', 'name location');

    res.status(201).json({
      success: true,
      message: 'Chat started',
      data: populatedChat,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's chat sessions
// @route   GET /api/chat
// @access  Private
const getMyChats = async (req, res, next) => {
  try {
    const { status = 'active', page = 1, limit = 20 } = req.query;

    const filter = {
      'participants.user': req.user._id,
    };

    if (status !== 'all') filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [chats, total] = await Promise.all([
      Chat.find(filter)
        .populate('participants.user', 'name avatar role isVerifiedGuide')
        .populate('place', 'name location')
        .select('-messages')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Chat.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: chats.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: chats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat messages
// @route   GET /api/chat/:id/messages
// @access  Private
const getChatMessages = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants.user', 'name avatar role')
      .populate('messages.sender', 'name avatar')
      .populate('place', 'name location');

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Only participants can view
    const isParticipant = chat.participants.some(
      (p) => p.user._id.toString() === req.user._id.toString()
    );

    if (!isParticipant && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this chat',
      });
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send a message in chat (REST fallback)
// @route   POST /api/chat/:id/messages
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { content, messageType } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
    }

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    if (chat.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Chat is not active',
      });
    }

    const isParticipant = chat.participants.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not a participant in this chat',
      });
    }

    const message = {
      sender: req.user._id,
      content: content.trim(),
      messageType: messageType || 'text',
    };

    chat.messages.push(message);
    chat.lastMessage = {
      content: content.trim(),
      sender: req.user._id,
      timestamp: new Date(),
    };

    await chat.save();

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Close a chat session
// @route   PUT /api/chat/:id/close
// @access  Private
const closeChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    const isParticipant = chat.participants.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (!isParticipant && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    chat.status = 'closed';
    chat.messages.push({
      sender: req.user._id,
      content: 'Chat session ended.',
      messageType: 'system',
    });

    await chat.save();

    res.status(200).json({
      success: true,
      message: 'Chat closed',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate a chat session
// @route   POST /api/chat/:id/rate
// @access  Private
const rateChat = async (req, res, next) => {
  try {
    const { score, feedback } = req.body;

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating score must be between 1 and 5',
      });
    }

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    if (chat.rating && chat.rating.score) {
      return res.status(400).json({
        success: false,
        message: 'Chat already rated',
      });
    }

    chat.rating = {
      score,
      feedback: feedback || '',
      ratedBy: req.user._id,
    };

    await chat.save();

    // Update guide's rating
    const guideParticipant = chat.participants.find(
      (p) => p.role === 'local_guide'
    );

    if (guideParticipant) {
      const guide = await User.findById(guideParticipant.user);
      if (guide) {
        const totalReviews = guide.guideDetails.totalReviews + 1;
        const newRating =
          (guide.guideDetails.rating * guide.guideDetails.totalReviews + score) /
          totalReviews;

        guide.guideDetails.rating = Math.round(newRating * 10) / 10;
        guide.guideDetails.totalReviews = totalReviews;
        await guide.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Chat rated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Find available local guides
// @route   GET /api/chat/available-guides
// @access  Private
const getAvailableGuides = async (req, res, next) => {
  try {
    const { state, city, specialization } = req.query;

    const filter = {
      role: 'local_guide',
      isVerifiedGuide: true,
      isActive: true,
      'guideDetails.availability': 'available',
    };

    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (specialization) {
      filter['guideDetails.specializations'] = new RegExp(specialization, 'i');
    }

    const guides = await User.find(filter)
      .select('name avatar location languages guideDetails')
      .sort({ 'guideDetails.rating': -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: guides.length,
      data: guides,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startChat,
  getMyChats,
  getChatMessages,
  sendMessage,
  closeChat,
  rateChat,
  getAvailableGuides,
};

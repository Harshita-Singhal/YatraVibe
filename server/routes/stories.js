const express = require('express');
const router = express.Router();
const {
  createStory,
  getStories,
  getStoryById,
  toggleLikeStory,
} = require('../controllers/storyController');
const { protect } = require('../middleware/auth');

router.get('/', getStories);
router.get('/:id', getStoryById);
router.post('/', protect, createStory);
router.post('/:id/like', protect, toggleLikeStory);

module.exports = router;

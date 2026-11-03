const express = require('express');
const router = express.Router();
const {
  createQuest,
  getQuests,
  getQuest,
  joinQuest,
  updateProgress,
  updateQuest,
  deleteQuest,
} = require('../controllers/questController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getQuests);
router.get('/:id', getQuest);

router.post('/', protect, authorize('admin'), createQuest);
router.post('/:id/join', protect, joinQuest);
router.put('/:id/progress', protect, updateProgress);
router.put('/:id', protect, authorize('admin'), updateQuest);
router.delete('/:id', protect, authorize('admin'), deleteQuest);

module.exports = router;

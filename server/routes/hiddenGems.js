const express = require('express');
const router = express.Router();
const {
  submitHiddenGem,
  getHiddenGems,
  getHiddenGem,
  upvoteHiddenGem,
  reviewHiddenGem,
  getPendingGems,
  updateHiddenGem,
  deleteHiddenGem,
} = require('../controllers/hiddenGemController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getHiddenGems);
router.get('/pending', protect, authorize('admin'), getPendingGems);
router.get('/:id', getHiddenGem);

router.post('/', protect, submitHiddenGem);
router.post('/:id/upvote', protect, upvoteHiddenGem);
router.put('/:id/review', protect, authorize('admin'), reviewHiddenGem);
router.put('/:id', protect, authorize('admin', 'local_guide'), updateHiddenGem);
router.delete('/:id', protect, authorize('admin'), deleteHiddenGem);

module.exports = router;

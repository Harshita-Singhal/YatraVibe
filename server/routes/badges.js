const express = require('express');
const router = express.Router();
const {
  createBadge,
  getBadges,
  getBadge,
  updateBadge,
  deleteBadge,
  awardBadge,
  getUserBadges,
} = require('../controllers/badgeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getBadges);
router.get('/user/:userId', getUserBadges);
router.get('/:id', getBadge);

router.post('/', protect, authorize('admin'), createBadge);
router.post('/award', protect, authorize('admin'), awardBadge);
router.put('/:id', protect, authorize('admin'), updateBadge);
router.delete('/:id', protect, authorize('admin'), deleteBadge);

module.exports = router;

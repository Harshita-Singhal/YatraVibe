const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/guides', getLocalGuides);
router.get('/leaderboard', getLeaderboard);
router.get('/profile/:id', getUserProfile);
router.put('/profile', protect, updateProfile);
router.put('/guide-details', protect, authorize('local_guide', 'admin'), updateGuideDetails);
router.put('/eco-choices', protect, updateEcoChoices);
router.post('/saved-places/:placeId', protect, toggleSavedPlace);

// Admin routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/verify-guide/:id', protect, authorize('admin'), verifyGuide);
router.put('/deactivate/:id', protect, authorize('admin'), deactivateUser);

module.exports = router;

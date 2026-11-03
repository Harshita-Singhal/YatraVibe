const express = require('express');
const router = express.Router();
const {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  getPlacesByCategory,
  getNearbyPlaces,
} = require('../controllers/placeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getPlaces);
router.get('/category/:category', getPlacesByCategory);
router.get('/nearby', getNearbyPlaces);
router.get('/:id', getPlace);

router.post('/', protect, authorize('admin', 'local_guide'), createPlace);
router.put('/:id', protect, authorize('admin', 'local_guide'), updatePlace);
router.delete('/:id', protect, authorize('admin'), deletePlace);

module.exports = router;

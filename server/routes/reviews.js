const express = require('express');
const router = express.Router();
const { createReview, getTargetReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/:targetType/:targetId', getTargetReviews);
router.post('/', protect, createReview);

module.exports = router;

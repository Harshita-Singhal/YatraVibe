const express = require('express');
const router = express.Router();
const {
  triggerSOS,
  getActiveAlerts,
  respondToSOS,
  resolveSOS,
} = require('../controllers/sosController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, triggerSOS);
router.get('/active', protect, authorize('admin', 'local_guide'), getActiveAlerts);
router.post('/:id/respond', protect, authorize('admin', 'local_guide'), respondToSOS);
router.put('/:id/resolve', protect, resolveSOS);

module.exports = router;

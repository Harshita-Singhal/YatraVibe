const express = require('express');
const router = express.Router();
const {
  startChat,
  getMyChats,
  getChatMessages,
  sendMessage,
  closeChat,
  rateChat,
  getAvailableGuides,
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.get('/guides', protect, getAvailableGuides);
router.post('/start', protect, startChat);
router.get('/my', protect, getMyChats);
router.get('/:id/messages', protect, getChatMessages);
router.post('/:id/messages', protect, sendMessage);
router.put('/:id/close', protect, closeChat);
router.post('/:id/rate', protect, rateChat);

module.exports = router;

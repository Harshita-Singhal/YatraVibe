const Chat = require('../models/Chat');

const setupChatSocket = (io) => {
  const activeUsers = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    // Register connected user
    socket.on('user_online', (userId) => {
      if (userId) {
        activeUsers.set(userId, socket.id);
        io.emit('user_status_changed', { userId, status: 'online' });
      }
    });

    // Join specific chat room
    socket.on('join_chat', (chatId) => {
      socket.join(chatId);
    });

    // Send real-time message
    socket.on('send_message', async ({ chatId, senderId, text, attachments = [] }) => {
      try {
        const chat = await Chat.findById(chatId);
        if (!chat) return;

        const newMessage = {
          sender: senderId,
          content: text,
          attachments,
          timestamp: new Date(),
          readBy: [senderId],
        };

        chat.messages.push(newMessage);
        chat.lastMessage = {
          text,
          sender: senderId,
          timestamp: new Date(),
        };
        await chat.save();

        // Broadcast to all participants in this room
        io.to(chatId).emit('receive_message', {
          chatId,
          message: newMessage,
        });

        // Notify other participant if they are online outside room
        const recipient = chat.participants.find((p) => p.user.toString() !== senderId);
        if (recipient && activeUsers.has(recipient.user.toString())) {
          io.to(activeUsers.get(recipient.user.toString())).emit('new_message_notification', {
            chatId,
            snippet: text,
            senderId,
          });
        }
      } catch (err) {
        console.error('Socket send_message error:', err);
      }
    });

    // Typing indicators
    socket.on('typing', ({ chatId, userName }) => {
      socket.to(chatId).emit('user_typing', { chatId, userName });
    });

    socket.on('stop_typing', ({ chatId }) => {
      socket.to(chatId).emit('user_stopped_typing', { chatId });
    });

    // Emergency SOS live broadcast
    socket.on('broadcast_sos', (sosPayload) => {
      io.emit('emergency_alert_received', {
        ...sosPayload,
        broadcastTime: new Date().toISOString(),
      });
    });

    // Disconnect handling
    socket.on('disconnect', () => {
      for (const [userId, sockId] of activeUsers.entries()) {
        if (sockId === socket.id) {
          activeUsers.delete(userId);
          io.emit('user_status_changed', { userId, status: 'offline' });
          break;
        }
      }
    });
  });
};

module.exports = setupChatSocket;

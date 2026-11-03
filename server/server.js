const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = require('./config/db');
connectDB();

// Initialize express app & HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Setup real-time chat socket handlers
const setupChatSocket = require('./socket/chatSocket');
setupChatSocket(io);

// Security & utility middlewares
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'YatraVibe Tourism API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/places', require('./routes/places'));
app.use('/api/hidden-gems', require('./routes/hiddenGems'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/quests', require('./routes/quests'));
app.use('/api/badges', require('./routes/badges'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/sos', require('./routes/sos'));
app.use('/api/itinerary', require('./routes/itinerary'));
app.use('/api/reviews', require('./routes/reviews'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found on YatraVibe API`,
  });
});

// Global error handler
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 YatraVibe Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

module.exports = { app, server };

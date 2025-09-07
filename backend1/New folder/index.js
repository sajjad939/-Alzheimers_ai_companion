require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const { scheduleAlerts } = require('./utils/alertScheduler');

// Import routes
const authRoutes = require('./routes/auth');
const memoriesRoutes = require('./routes/memories');
const alertsRoutes = require('./routes/alerts');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memories', memoriesRoutes);
app.use('/api/alerts', alertsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start alert scheduler
  scheduleAlerts();
  console.log('Alert scheduler started');
});

module.exports = app; // For testing purposes
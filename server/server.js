require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const sneakerRoutes = require('./routes/sneakerRoutes');

const app = express();

async function initializeApp() {
  await connectDB();

  app.use(cors());
  app.use(express.json());

  // Add logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.use('/api/sneakers', sneakerRoutes);

  // Health check route
  app.get('/api/health', (req, res) => {
    console.log('Health check route hit');
    res.status(200).json({ status: 'OK' });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  // Handle undefined routes
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
}

initializeApp().catch(error => {
  console.error('Failed to initialize app:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;

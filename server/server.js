require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const sneakerRoutes = require('./routes/sneakerRoutes');

const app = express();

async function initializeApp() {
  await connectDB();

  app.use(cors({ origin: process.env.CLIENT_URL }));
  app.use(express.json());

  app.use('/api/sneakers', sneakerRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  // Health check route
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
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

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

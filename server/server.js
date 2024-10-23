require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const sneakerRoutes = require('./routes/sneakerRoutes');

const app = express();

console.log('Server code is running');

const PORT = process.env.PORT || 5000;

async function initializeApp() {
  console.log('Initializing app...');
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    console.error('App will continue without database connection');
  }

  app.use(cors());
  app.use(express.json());

  // Add logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Use sneaker routes
  app.use('/api/sneakers', sneakerRoutes);

  // Health check route
  app.get('/api/health', (req, res) => {
    console.log('Health check route hit');
    res.status(200).json({ 
      status: 'OK', 
      message: 'Server is running'
    });
  });

  // Test route
  app.get('/api/test', (req, res) => {
    console.log('Test route hit');
    res.status(200).json({ message: 'Test route is working' });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
  });

  // Handle undefined routes
  app.use('*', (req, res) => {
    console.log('404 - Route not found:', req.originalUrl);
    res.status(404).json({ message: 'Route not found' });
  });

  console.log('App initialization completed');
}

// Initialize the app
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;

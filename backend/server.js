require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const sneakerRoutes = require('./routes/sneakerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const connectWithRetry = async () => {
  const maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'kickskraze'
      });
      console.log('MongoDB connected successfully');
      console.log('Connected to database:', mongoose.connection.db.databaseName);
      return;
    } catch (err) {
      console.error(`Connection attempt ${i + 1} failed:`, err);
      if (i < maxRetries - 1) await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  console.error('Max retries reached. Exiting...');
  process.exit(1);
};

connectWithRetry();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sneakers', sneakerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const sneakerRoutes = require('./routes/sneakerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.use(cors());
  app.use(express.json());

  app.use('/api/sneakers', sneakerRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

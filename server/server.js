import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import itemRoutes from './routes/itemRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Add this near your other routes
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: err.message,
    stack: err.stack 
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

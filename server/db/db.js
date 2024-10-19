const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'kickskraze'
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Connected to database:', conn.connection.db.databaseName);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

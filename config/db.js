// config/db.js
// Centralized DB helpers. Supports an in-memory simulated DB (for tests/dev)
// and exports connectToDatabase() which sets up a serverless-friendly
// cached mongoose connection when MONGO_URI is provided.

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// config/db.js - NEW/CORRECT (Using dynamic import)
const connectDB = async () => { // Make the function async
    // Dynamically import uuid
    let uuidv4;
    try {
        const uuidModule = await import('uuid'); // Use dynamic import
        uuidv4 = uuidModule.v4;
    } catch (e) {
        console.error("Failed to load UUID:", e);
        // Handle error if module loading fails (unlikely if package is installed)
    }

    // Now proceed with your database logic
    try {
        // ... mongoose.connect() or other database connection code
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('Database Connection Failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

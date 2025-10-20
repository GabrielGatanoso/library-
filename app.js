require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');

const bookRoutes = require('./routes/booksRoutes');
const memberRoutes = require('./routes/memberRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB connection (serverless-friendly helper in config/db.js)
connectToDatabase().catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Require DB helpers robustly (support CommonJS and possible default export)
const dbModule = require('./config/db');
const connectToDatabase = dbModule && (dbModule.connectToDatabase || dbModule.default && dbModule.default.connectToDatabase);

const bookRoutes = require('./routes/booksRoutes');
const memberRoutes = require('./routes/memberRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Initialize DB connection (serverless-friendly helper in config/db.js)
if (typeof connectToDatabase === 'function') {
  connectToDatabase().catch(err => console.error('❌ MongoDB connection error:', err));
} else {
  console.warn('⚠️ connectToDatabase is not available — running without MongoDB connection helper.');
}

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);

// Start server
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;

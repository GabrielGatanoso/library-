// config/db.js (Focus on core connection only)
const mongoose = require('mongoose'); // Assuming you use Mongoose

const connectDB = async () => {
    try {
        // Ensure you are using the environment variable for the connection string
        await mongoose.connect(process.env.MONGO_URI, { 
            // Include recommended options for Mongoose 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // (Note: useCreateIndex and useFindAndModify are often deprecated/unnecessary now)
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        // CRITICAL: Log error and exit if connection fails
        console.error('Database connection error:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;

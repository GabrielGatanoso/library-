// config/db.js
// Centralized DB helpers. Supports an in-memory simulated DB (for tests/dev)
// and exports connectToDatabase() which sets up a serverless-friendly
// cached mongoose connection when MONGO_URI is provided.

const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

// ----------------------------------------------------------------
// SIMULATED IN-MEMORY DATABASE (fallback)
// ----------------------------------------------------------------
const db = {
    books: [],
    members: [],
    loans: []
};

// Simple ID function using Node crypto.randomUUID
const nextId = () => randomUUID();

// Initial data for easy testing
const seedData = () => {
    const member1 = { id: nextId(), name: 'Alice Smith', email: 'alice@example.com', joinedAt: new Date().toISOString() };
    const member2 = { id: nextId(), name: 'Bob Johnson', email: 'bob@example.com', joinedAt: new Date().toISOString() };
    db.members.push(member1, member2);

    const book1 = { id: nextId(), isbn: '978-0321765723', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', copies: 5 };
    const book2 = { id: nextId(), isbn: '978-1449331806', title: '1984', author: 'George Orwell', copies: 2 };
    db.books.push(book1, book2);

    const loanedAt = new Date();
    const dueAt = new Date(loanedAt);
    dueAt.setDate(loanedAt.getDate() + 14);

    const loan1 = {
        id: nextId(),
        memberId: member1.id,
        bookId: book1.id,
        loanedAt: loanedAt.toISOString(),
        dueAt: dueAt.toISOString(),
        returnedAt: null
    };
    db.loans.push(loan1);
    book1.copies--;
};

seedData();

// ----------------------------------------------------------------
// Serverless-friendly mongoose connection helper
// ----------------------------------------------------------------
const cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

async function connectToDatabase() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.warn('MONGO_URI not set; using in-memory DB in config/db.js');
        return null;
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = { bufferCommands: false };
        cached.promise = mongoose.connect(mongoUri, opts).then(m => m.connection);
    }

    cached.conn = await cached.promise;
    console.log('✅ Connected to MongoDB (config/db.js cached)');
    return cached.conn;
}

module.exports = { db, nextId, connectToDatabase };

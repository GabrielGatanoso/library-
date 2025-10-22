// config/db.js
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------------------------------------
// SIMULATED IN-MEMORY DATABASE
// In a real-world scenario, you would replace this with actual
// database connection (e.g., MongoDB, PostgreSQL, etc.).
// ----------------------------------------------------------------

const db = {
    books: [],
    members: [],
    loans: []
};

// Simple ID function using uuid
const nextId = () => uuidv4();

// Initial data for easy testing
const seedData = () => {
    // 1. Members
    const member1 = { id: nextId(), name: 'Alice Smith', email: 'alice@example.com', joinedAt: new Date().toISOString() };
    const member2 = { id: nextId(), name: 'Bob Johnson', email: 'bob@example.com', joinedAt: new Date().toISOString() };
    db.members.push(member1, member2);

    // 2. Books (Note: copies field is crucial for loan logic)
    const book1 = { id: nextId(), isbn: '978-0321765723', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', copies: 5 };
    const book2 = { id: nextId(), isbn: '978-1449331806', title: '1984', author: 'George Orwell', copies: 2 };
    db.books.push(book1, book2);

    // 3. Loans (Member 1 loans Book 1)
    const loanedAt = new Date();
    const dueAt = new Date(loanedAt);
    dueAt.setDate(loanedAt.getDate() + 14); // Due in 14 days
    
    const loan1 = {
        id: nextId(),
        memberId: member1.id,
        bookId: book1.id,
        loanedAt: loanedAt.toISOString(),
        dueAt: dueAt.toISOString(),
        returnedAt: null // Not returned yet
    };
    db.loans.push(loan1);

    // Decrement copy count for the loaned book
    book1.copies--;
};

seedData();

export { db, nextId };

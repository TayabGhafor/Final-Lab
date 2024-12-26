const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Borrower = require('../models/Borrower');

const sampleData = async () => {
  await connectDB();

  // Add some sample authors
  const author1 = await Author.create({ name: 'J.K. Rowling', email: 'jk@example.com', phoneNumber: '1234567890' });
  const author2 = await Author.create({ name: 'J.R.R. Tolkien', email: 'tolkien@example.com', phoneNumber: '0987654321' });

  // Add some sample books
  const book1 = await Book.create({ title: 'Harry Potter and the Philosopher\'s Stone', author: author1._id, isbn: '9780747532699', availableCopies: 10 });
  const book2 = await Book.create({ title: 'The Hobbit', author: author2._id, isbn: '9780261102217', availableCopies: 5 });

  // Add a sample borrower
  const borrower = await Borrower.create({ name: 'John Doe', membershipActive: true, membershipType: 'Standard' });

  console.log('Sample data added successfully!');
  mongoose.connection.close();
};

sampleData();

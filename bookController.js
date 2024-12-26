const Book = require('../models/Book');
const Borrower = require('../models/Borrower');

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, isbn, availableCopies } = req.body;
  
  try {
    const book = new Book({ title, author, isbn, availableCopies });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book's available copies
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { availableCopies } = req.body;
  
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    book.availableCopies = availableCopies;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  const { borrowerId, bookId } = req.body;
  
  try {
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);
    
    if (!borrower || !book) {
      return res.status(404).json({ message: "Borrower or Book not found." });
    }
    
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No available copies of the book." });
    }
    
    if (!borrower.canBorrow()) {
      return res.status(400).json({ message: `Cannot borrow more than ${borrower.membershipType === 'Premium' ? 10 : 5} books.` });
    }
    
    borrower.borrowedBooks.push(bookId);
    book.availableCopies -= 1;
    book.borrowingFrequency += 1;
    
    await borrower.save();
    await book.save();
    
    res.status(200).json({ message: "Book borrowed successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Return a borrowed book
exports.returnBook = async (req, res) => {
  const { borrowerId, bookId } = req.body;
  
  try {
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);
    
    if (!borrower || !book) {
      return res.status(404).json({ message: "Borrower or Book not found." });
    }
    
    borrower.borrowedBooks.pull(bookId);
    book.availableCopies += 1;
    
    await borrower.save();
    await book.save();
    
    res.status(200).json({ message: "Book returned successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

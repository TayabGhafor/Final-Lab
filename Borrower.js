const mongoose = require('mongoose');

const BorrowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    membershipActive: { type: Boolean, required: true },
    membershipType: { type: String, enum: ['Standard', 'Premium'], required: true },
  },
  { timestamps: true }
);

// Custom method to check borrowing limits based on membership type
BorrowerSchema.methods.canBorrow = function() {
  const limit = this.membershipType === 'Premium' ? 10 : 5;
  return this.borrowedBooks.length < limit;
};

module.exports = mongoose.model('Borrower', BorrowerSchema);

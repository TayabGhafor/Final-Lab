const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    isbn: { type: String, required: true, unique: true },
    availableCopies: { type: Number, required: true, min: 0 },
    borrowingFrequency: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Custom validation to ensure available copies do not exceed 100 when borrowing frequency > 10
BookSchema.pre('save', function(next) {
  if (this.borrowingFrequency > 10 && this.availableCopies > 100) {
    return next(new Error('Available copies cannot exceed 100 if borrowed more than 10 times.'));
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phoneNumber: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', AuthorSchema);

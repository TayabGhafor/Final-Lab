const Borrower = require('../models/Borrower');
const Book = require('../models/Book');

// Add a new borrower
exports.addBorrower = async (req, res) => {
  const { name, membershipActive, membershipType } = req.body;
  
  try {
    const borrower = new Borrower({ name, membershipActive, membershipType });
    await borrower.save();
    res.status(201).json(borrower);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update borrower membership
exports.updateBorrower = async (req, res) => {
  const { id } = req.params;
  const { membershipActive, membershipType } = req.body;
  
  try {
    const borrower = await Borrower.findById(id);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found." });
    }
    borrower.membershipActive = membershipActive;
    borrower.membershipType = membershipType;
    await borrower.save();
    res.status(200).json(borrower);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a borrower
exports.deleteBorrower = async (req, res) => {
  const { id } = req.params;
  
  try {
    const borrower = await Borrower.findByIdAndDelete(id);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found." });
    }
    res.status(200).json({ message: "Borrower deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

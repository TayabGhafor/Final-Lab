const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

router.post('/', borrowerController.addBorrower);
router.put('/:id', borrowerController.updateBorrower);
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router;

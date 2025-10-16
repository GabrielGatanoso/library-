const express = require('express');
const router = express.Router();
const { getAllLoans, getLoanById, createLoan, deleteLoan } = require('/Users/Admin/Documents/Back_end_library/controllers/loanController');

router.get('/', getAllLoans);
router.get('/:id', getLoanById);
router.post('/', createLoan);
router.delete('/:id', deleteLoan);

module.exports = router;
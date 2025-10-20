const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, deleteBook } = require('../controllers/bookRoutes');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.delete('/:id', deleteBook);

module.exports = router;
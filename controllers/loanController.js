const Loan = require('/Users/Admin/Documents/Back_end_library/models/loan');

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('bookId memberId');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('bookId memberId');
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLoan = async (req, res) => {
  try {
    const { bookId, memberId, returnDate } = req.body;
    const loan = new Loan({ bookId, memberId, returnDate });
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllLoans, getLoanById, createLoan, deleteLoan };
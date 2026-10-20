const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error('Only jpg/png allowed'));
  },
});

// GET my listings (auth required) — MUST be placed BEFORE /:id route
router.get('/user/mylistings', auth, async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user.id }).sort({ createdAt: -1 });
    res.json(books);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all available books (with search + filter)
router.get('/', async (req, res) => {
  try {
    const { search, subject, condition, page = 1, limit = 12 } = req.query;
    const query = { status: 'available' };

    if (search) query.$or = [
      { title:  { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
    ];
    if (subject)   query.subject = subject;
    if (condition) query.condition = condition;

    const books = await Book.find(query)
      .populate('seller', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(query);
    res.json({ books, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('seller', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch {
    res.status(404).json({ message: 'Book not found' });
  }
});

// POST create a listing (auth required)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, author, price, condition, subject, year, contact, description } = req.body;
    if (!title || !author || !price || !condition || !subject || !contact)
      return res.status(400).json({ message: 'Required fields missing' });

    const book = await Book.create({
      title, author, price, condition, subject, year, contact, description,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      seller: req.user.id,
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update listing (auth + ownership required)
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.seller.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE listing (auth + ownership required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.seller.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await book.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH mark as sold (auth + ownership required)
router.patch('/:id/sold', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.seller.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    book.status = 'sold';
    await book.save();
    res.json(book);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

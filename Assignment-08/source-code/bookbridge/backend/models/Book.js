const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  author:     { type: String, required: true },
  price:      { type: Number, required: true },
  condition:  { type: String, enum: ['Like new', 'Good', 'Fair'], required: true },
  subject:    { type: String, required: true },
  year:       { type: String },
  contact:    { type: String, required: true },
  description:{ type: String },
  image:      { type: String, default: '' },
  status:     { type: String, enum: ['available', 'sold'], default: 'available' },
  seller:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

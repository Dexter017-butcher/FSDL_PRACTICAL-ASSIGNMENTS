require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Car = require('./models/Car');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/autoexchange')
.then(() => console.log('Connected to MongoDB locally'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
// Get all available cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find({ status: 'Available' });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching cars' });
  }
});

// Get single car details
app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching car' });
  }
});

// Submit Inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { carId, name, email, message } = req.body;
    if (!carId || !name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newInquiry = new Inquiry({ carId, name, email, message });
    await newInquiry.save();
    
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ error: 'Server error submitting inquiry' });
  }
});

// Get all Inquiries (Appointments)
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('carId').sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Server error fetching inquiries' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

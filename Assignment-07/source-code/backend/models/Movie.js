import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  posterUrl: { type: String, required: true },
  description: { type: String, required: true },
  backdropUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);

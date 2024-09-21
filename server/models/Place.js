const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, text: true }, // Indexing title field for text search
  address: String,
  photos: [String],
  description: { type: String, text: true }, // Indexing description field for text search
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

// Indexing title and description fields for text search
placeSchema.index({ title: 'text', description: 'text' });

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;

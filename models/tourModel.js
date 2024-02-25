const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a tour name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Please add a tour duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAvarage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuality: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Please add a tour price'],
  },
  priceDiscount: { Number },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Please add a tour summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tiur must have an image cover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

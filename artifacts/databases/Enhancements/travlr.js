// app_api/models/travlr.js
const mongoose = require('mongoose');

// ENHANCEMENT – Added validation rules + field docs + indexes
const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[A-Z0-9-]+$/, // uppercase letters, digits, hyphens only
      description: 'Unique trip code (e.g., ABC-123)'
    },
    name: {
      type: String,
      required: true,
      trim: true,
      description: 'Trip name'
    },
    length: {
      type: String,
      required: true,
      trim: true,
      description: 'Trip duration like "7 nights"'
    },
    start: {
      type: Date,
      required: true,
      index: true, // ENHANCEMENT – for sorting/pagination
      description: 'Trip start date'
    },
    resort: {
      type: String,
      required: true,
      trim: true,
      description: 'Resort name'
    },
    perPerson: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
      description: 'Price per person'
    },
    image: {
      type: String,
      trim: true,
      description: 'Image filename or URL'
    },
    description: {
      type: String,
      default: '',
      description: 'Trip details'
    }
  },
  { timestamps: true }
);

mongoose.model('trips', tripSchema);

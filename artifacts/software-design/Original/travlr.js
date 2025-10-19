// app_api/models/travlr.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    length: { type: String, required: true, trim: true }, // e.g. "7 nights"
    start: { type: Date, required: true },
    resort: { type: String, required: true, trim: true },
    perPerson: { type: Number, required: true },          // NUMBER (Module 6 & Angular expect this)
    image: { type: String, trim: true },                   // e.g. "/images/reef1.jpg" or "reef1.jpg"
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

mongoose.model('trips', tripSchema);


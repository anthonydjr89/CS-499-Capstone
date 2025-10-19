const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const Joi = require('joi'); // ENHANCEMENT – Added validator for input safety

// ENHANCEMENT – Validation schema to reject unknown or invalid fields
const tripSchemaValidation = Joi.object({
  code: Joi.string().alphanum().min(2).max(10),
  name: Joi.string().required(),
  length: Joi.string().required(),
  start: Joi.date().required(),
  resort: Joi.string().required(),
  perPerson: Joi.number().min(0).max(10000).required(),
  image: Joi.string().allow(''),
  description: Joi.string().allow('')
});

// GET /api/trips
async function tripsList(req, res) {
  try {
    // ENHANCEMENT – Added pagination with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Trip.countDocuments();
    const trips = await Trip.find()
      .sort({ start: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      data: trips,
      page,
      limit,
      total
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// GET /api/trips/:tripCode
async function tripsFindByCode(req, res) {
  try {
    const { tripCode } = req.params;
    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip)
      // ENHANCEMENT – Consistent 404 message
      return res.status(404).json({ message: `Trip '${tripCode}' not found` });
    res.status(200).json(trip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// POST /api/trips
async function tripsAddTrip(req, res) {
  try {
    // ENHANCEMENT – Validate request body before DB insert
    const { error, value } = tripSchemaValidation.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
    }

    const created = await Trip.create(value);
    res.status(201).json(created);
  } catch (e) {
    if (e.code === 11000)
      return res.status(409).json({ message: 'Trip code must be unique' });
    res.status(400).json({ message: e.message });
  }
}

// PUT /api/trips/:tripCode
async function tripsUpdateTrip(req, res) {
  try {
    const { tripCode } = req.params;

    // ENHANCEMENT – Validate updates
    const { error, value } = tripSchemaValidation.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
    }

    const updated = await Trip.findOneAndUpdate(
      { code: tripCode },
      { $set: value },
      { new: true, runValidators: true } // ENHANCEMENT – runValidators & return new doc
    ).lean();

    if (!updated)
      // ENHANCEMENT – Consistent 404 message
      return res.status(404).json({ message: `Trip '${tripCode}' not found` });

    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};

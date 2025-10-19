const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips
async function tripsList(req, res) {
  try {
    const trips = await Trip.find().sort({ start: 1 }).lean();
    res.status(200).json(trips);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// GET /api/trips/:tripCode
async function tripsFindByCode(req, res) {
  try {
    const { tripCode } = req.params;
    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip) return res.status(404).json({ message: Trip '${tripCode}' not found });
    res.status(200).json(trip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// POST /api/trips
async function tripsAddTrip(req, res) {
  try {
    const b = req.body || {};
    const doc = {
      code: b.code,
      name: b.name,
      length: b.length,
      start: b.start ? new Date(b.start) : undefined,
      resort: b.resort,
      perPerson: b.perPerson,
      image: b.image || '',
      description: b.description || ''
    };
    const created = await Trip.create(doc);
    res.status(201).json(created);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: 'Trip code must be unique' });
    res.status(400).json({ message: e.message });
  }
}

// PUT /api/trips/:tripCode
async function tripsUpdateTrip(req, res) {   // <-- renamed
  try {
    const { tripCode } = req.params;
    const b = req.body || {};
    const update = {
      name: b.name,
      length: b.length,
      start: b.start ? new Date(b.start) : undefined,
      resort: b.resort,
      perPerson: b.perPerson,
      image: b.image || '',
      description: b.description || ''
    };
    Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);

    const updated = await Trip.findOneAndUpdate(
      { code: tripCode },
      { $set: update },
      { new: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: Trip '${tripCode}' not found });
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip     // <-- renamed export
};

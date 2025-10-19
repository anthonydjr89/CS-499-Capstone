// app_api/models/db.js
const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/travlr';

// Modern driver: no deprecated options needed
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(Mongoose connected to ${dbURI});
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Register models
require('./travlr');

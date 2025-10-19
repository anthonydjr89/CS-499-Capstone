// app_api/models/db.js
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/travlr';


// ENHANCEMENT – Added retry/back-off for transient connect errors
const connectWithRetry = () => {
  mongoose
    .connect(dbURI)
    .then(() => console.log(`Mongoose connected to ${dbURI}`))
    .catch(err => {
      console.error('Initial connection failed, retrying in 5 seconds…', err.message);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();


// ENHANCEMENT – Event handlers explained
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});


// ENHANCEMENT – Graceful shutdown hooks
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
}

process.once('SIGINT', () =>
  gracefulShutdown('app termination', () => process.exit(0))
);
process.once('SIGTERM', () =>
  gracefulShutdown('Heroku app shutdown', () => process.exit(0))
);


// Register models
require('./travlr');

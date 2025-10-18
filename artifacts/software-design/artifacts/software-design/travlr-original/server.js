const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;

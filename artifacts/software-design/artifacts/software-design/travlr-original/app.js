// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');

// Wire in our authentication module
var passport = require('passport');
require('./app_api/config/passport');

// IMPORTANT: register DB & models BEFORE requiring API routes
require('./app_api/models/db');

const apiRouter = require('./app_api/routes/index'); // <-- after DB is required

const app = express();

//Security headers (dev-friendly)

// Allow cross-origin <img>/assets during dev
app.use(helmet({ crossOriginResourcePolicy: false }));

//CORS (Angular dev on 4200/4300)
const allowed = new Set([
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://localhost:4300',
  'http://127.0.0.1:4300'
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowed.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*'); // ok for curl/Postman
  }
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

//Standard middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//View engine (server-rendered pages)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

//Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); // <-- added

// Also expose images under /api/images (handy with Angular proxy)
app.use('/api/images', express.static(path.join(__dirname, 'public', 'images')));

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// 401 Unauthorized from auth middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ "message": err.name + ": " + err.message });
  }
  next(err);
});

//404 handler
app.use((req, res, next) => {
  next(createError(404));
});

//Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;

  if (req.originalUrl && req.originalUrl.startsWith('/api')) {
    return res.status(status).json({ message: err.message || 'Server error' });
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  res.render('error');
});

module.exports = app;

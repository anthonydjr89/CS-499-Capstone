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



// ENHANCEMENT – Add structured request logging with a unique ID for each request
const { randomUUID } = require('crypto');
app.use((req, res, next) => {
  req.requestId = randomUUID();
  console.log(`[${req.method}] ${req.originalUrl} - Request ID: ${req.requestId}`);
  next();
});



//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// 401 Unauthorized from auth middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // ENHANCEMENT – Standardize 401 response shape
    return res.status(401).json({
      code: 'AUTH_ERROR',
      message: err.message || 'Unauthorized',
      requestId: req.requestId
    });
  }
  next(err);
});



//404 handler
app.use((req, res, next) => {
  next(createError(404));
});



// ENHANCEMENT – Global error handler returns standardized shape for API routes
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  if (req.originalUrl && req.originalUrl.startsWith('/api')) {
    return res.status(status).json({
      code: status === 404 ? 'NOT_FOUND' : 'SERVER_ERROR',
      message: err.message || 'Server error',
      requestId: req.requestId
    });
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  res.render('error');
});



// ENHANCEMENT – Example placeholder test for integration/unit testing
// This can be expanded into a Jest or Mocha test file later.
if (process.env.NODE_ENV === 'test') {
  app.get('/api/test-error', (req, res, next) => {
    next(createError(500, 'Intentional test error'));
  });
}

module.exports = app;

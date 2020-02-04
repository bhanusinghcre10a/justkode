const express = require('express');
const morgan = require('morgan');
const ratelimit = require('express-rate-limit');
const path = require('path');
const usersrouter = require('./routes/userrout');
const viewrout = require('./routes/viewrout');
const cookieParser = require('cookie-parser');

const errorcontrol = require('./controller/errorcontroller');
const errors = require('./util/errorclass');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

var cons = require('consolidate');

// view engine setup

const app = express();
app.use(helmet());

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'html');

app.set('view engine', 'pug');

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(sanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ['duration']
  })
);
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'node_modules')));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use((req, res, next) => {
  console.log('hello from middlewere');
  next();
});
const limit = ratelimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'you access this rout so many times please come after an hour ago'
});

app.use('/api', limit);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', usersrouter);
app.use('/api/v1', viewrout);

app.all('*', (req, res, next) => {
  next(new errors(`not found ${req.originalUrl} in the server`, 404));
});

app.use(errorcontrol);

module.exports = app;

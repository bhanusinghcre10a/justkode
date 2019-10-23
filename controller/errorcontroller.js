const errors = require('./../util/errorclass');

const handlecasterror = err => {
  const message = `invalid ${err.path}:${err.value}`;
  return new errors(message, 404);
};
const handleduplicateerror = err => {
  const name = err.errmsg.match(/([""'])(\\?.)*?\1/);
  const message = `not a valid name ${name} is already registered`;
  return new errors(message, 404);
};
const handlejsontokenerror = () => {
  return new errors('not a valid user please login again', 401);
};
const handletokenexpirederror = () => {
  return new errors('session is expired please login again', 401);
};
const handlevalidationerror = err => {
  const errormsg = Object.values(err).map(el => {
    el.message;
  });
  const message = `invalid input :${errormsg.join('. ')}`;
  return new errors(message, 404);
};

const errordev = (err, res) => {
  res.status(err.satusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};
const errorprod = (err, res) => {
  if (err.isoperational) {
    res.status(err.satusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    Console.log('error');
    res.status(500).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.satusCode = err.satusCode || 404;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    errordev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let { error } = { ...err };
    if (error.name === 'CastError') error = handlecasterror(error);
    if (error.code == 11000) error = handleduplicateerror(error);
    if (error.name === 'ValdationError') error = handlevalidationerror();
    if (error.name === 'JsonWebTokenError') error = handlejsontokenerror();
    if (error.name === 'TokenExpiredError')
      error = handletokenexpirederror(error);

    errorprod(error, res);
  }

  next();
};

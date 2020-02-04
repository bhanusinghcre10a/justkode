const User = require('./../model/usermodel');
const jwt = require('jsonwebtoken');
const errors = require('./../util/errorclass');
const sendEmail = require('./../util/mail');
const { promisify } = require('util');
const crypto = require('crypto');
const io = require('./../server');

const catchasync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const createandsendtoken = (user, statuscode, res) => {
  const token = signtoken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRESIN_cookie * 24 * 60 * 60 * 1000
    ),
    htttpOnly: true,
    secure: false
  };
  // if (process.env.NODE_ENV === 'production') {
  //   cookieoption.secure = true;
  // }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statuscode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
};
const signtoken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });
};
exports.getusers = catchasync(async (req, res, next) => {
  const users = await User.find({});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.signup = catchasync(async (req, res, next) => {
  const newuser = await User.create(req.body);
  createandsendtoken(newuser, 200, res);
});
exports.signin = catchasync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errors('please enter email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkpassword(user.password, password))) {
    return next(new errors('email or password is incorrect', 401));
  }

  createandsendtoken(user, 200, res);
});

exports.protect = catchasync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new errors('not authorised to see the page please login again', 401)
    );
  }

  const decoder = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentuser = await User.findById(decoder.id);

  if (!currentuser) {
    return next(new errors('the user is no longer existed', 401));
  }
  if (currentuser.changepasswordafter(decoder.iat)) {
    return next(new errors('password is changed please login again', 401));
  }
  req.user = currentuser;
  next();
});
exports.accessto = (...users) => {
  return (req, res, next) => {
    if (!users.includes(req.user.usertype)) {
      next(new errors('not aouthorised to use this link'));
    }
    next();
  };
};

exports.forgotpassword = catchasync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new errors('no user exist with this id', 401));
  }

  const resettoken = await user.createforgetpasswordtoken();
  await user.save({ validateBeforeSave: false });
  const reseturl = `${req.protocol}://${req.get(
    'host'
  )}/ap1/v1/users/resetpassword/${resettoken}`;
  const message = `click the link ${reseturl} to reset the password this link is valid for 10 mmin`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'valid for 10 min',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'mail is successfully sent'
    });
  } catch (err) {
    user.passwordtokenexpireat = undefined;
    user.passwordresettoken = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    next(new errors('email not sent please try again', 401));
  }
});
exports.resetpassword = catchasync(async (req, res, next) => {
  const hashedtoken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordresettoken: hashedtoken,
    passwordtokenexpireat: { $gt: Date.now() }
  });

  if (!user) {
    return next('either token is expired or timed out', 401);
  }

  user.password = req.body.password;
  user.passmatch = req.body.passmatch;
  user.passwordresettoken = undefined;
  user.passwordtokenexpireat = undefined;
  user.save();

  createandsendtoken(user, 200, res);
});

exports.viewuser = catchasync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new errors('not authorised to see the page please login again', 401)
    );
  }

  const decoder = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentuser = await User.findById(decoder.id);

  if (!currentuser) {
    return next(new errors('the user is no longer existed', 401));
  }
  if (currentuser.changepasswordafter(decoder.iat)) {
    return next(new errors('password is changed please login again', 401));
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.status(200).json({
    status: 'success',
    data: {
      user: currentuser
    }
  });
});
exports.updatepassword = catchasync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.checkpassword(user.password, req.body.passwordcurrent))) {
    next(new errors('your current password is incorrect', 401));
  }

  user.password = req.body.password;
  user.passmatch = req.body.passmatch;
  await user.save();
  createandsendtoken(user, 201, res);
});
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).send('<h1>you are logged out<h1>');
};

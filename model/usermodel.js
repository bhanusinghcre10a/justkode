const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user must have name']
  },
  email: {
    type: String,
    required: [true, 'user must have a email id'],
    validate: [validator.isEmail, 'please input a valid eamil id'],
    unique: true
  },
  usertype: {
    type: String,
    default: 'user',
    enum: {
      values: ['admin', 'user'],
      message: 'user type is only either admin or user'
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordupdatedat: Date,
  passwordresettoken: String,
  year: Number,
  branch: String,
  passwordtokenexpireat: Date,
  about: String,
  photo: String,
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  passmatch: {
    type: String,
    required: true,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'please check your pass'
    }
  }
});

userschema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passmatch = undefined;
  next();
});
userschema.pre('save', async function(next) {
  if (!this.isModified('password' || this.isNew)) return next();

  this.passwordupdatedat = Date.now() - 1;
});
userschema.pre(/^find/, async function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userschema.methods.checkpassword = async function(userpassword, savepassword) {
  return await bcrypt.compare(savepassword, userpassword);
};
userschema.methods.changepasswordafter = function(jwtusetime) {
  if (this.passwordupdatedat) {
    const changeat = parseInt(this.passwordupdatedat.getTime() / 1000, 10);
    return jwtusetime < changeat;
  } else return false;
};
userschema.methods.createforgetpasswordtoken = async function() {
  const resettoken = crypto.randomBytes(32).toString('hex');
  this.passwordresettoken = crypto
    .createHash('sha256')
    .update(resettoken)
    .digest('hex');
  this.passwordtokenexpireat = Date.now() + 10 * 60 * 1000;
  return resettoken;
};

const User = new mongoose.model('User', userschema);

module.exports = User;

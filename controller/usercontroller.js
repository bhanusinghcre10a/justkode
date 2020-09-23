const User = require('./../model/usermodel');
const errors = require('./../util/errorclass');

const catchasync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const filter = (obj, ...allowed) => {
  const newobj = {};
  Object.keys(obj).forEach(el => {
    if (allowed.includes(el)) {
      newobj[el] = obj[el];
    }
  });
  return newobj;
};

exports.updateme = catchasync(async (req, res, next) => {
  if (req.body.password || req.body.passmatch) {
    return next(
      new errors('not able to update password through this rout', 400)
    );
  }

  const filterobj = filter(req.body, 'email', 'name');

  const updateduser = await User.findByIdAndUpdate(req.user.id, filterobj, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    message: 'user updated successfully',
    user: updateduser
  });
});

exports.deleteme = catchasync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: 'false' });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

const catchasync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
exports.home = catchasync(async (req, res, next) => {
  res.status(200).render('home.pug', {
    title: 'justcode'
  });
});

exports.login = catchasync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'justcode  | login'
  });
});

exports.signup = catchasync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'justcode | signup'
  });
});

exports.users = catchasync(async (req, res, next) => {
  res.status(200).render('users.html', {
    title: 'justcode | users'
  });
});
exports.updateuser = catchasync(async (req, res, next) => {
  res.status(200).render('user.html', {
    title: 'justcode | user'
  });
});

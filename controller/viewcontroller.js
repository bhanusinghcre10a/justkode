const catchasync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
exports.home = catchasync(async (req, res, next) => {
  res.status(200).render('home', {
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

exports.user = catchasync(async (req, res, next) => {
  res.status(200).render('user', {
    title: 'justcode | user'
  });
});

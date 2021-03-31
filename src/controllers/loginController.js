const { login, register } = require('../services/accountService');

exports.loginGet = function (req, res, next) {
  return res.render('login');
};

exports.loginPost = function (req, res, next) {
  const password = req.body.password;
  switch (req.body.formName) {
    case 'login': {
      const identifier = req.body.username;

      return login(res, identifier, password).then(function () {
        return res.redirect(`${process.env.PATH_PREFIX}/`);
      });
    }

    case 'register': {
      const email = req.body.email;
      const username = req.body.username;

      return register(res, username, email, password).then(function () {
        return res.redirect(`${process.env.PATH_PREFIX}/`);
      });
    }
  }
};

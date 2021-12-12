'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/errors');

const login = (req, res, next) => {
  // TODO: add passport authenticate
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('login info', err, user, info);
    if (err || !user) {
      next(httpError('Invalid username/password', 400));
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('Login error', 400));
        return;
      }
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

const user_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req); // TODO require validationResult, see userController

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    // TODO: bcrypt password

    const params = [
      req.body.name,
      req.body.username,
      req.body.password, // TODO: save hash instead of the actual password
    ];

    const result = await addUser(params);
    if (result.insertId) {
      res.json({ message: `User added`, user_id: result.insertId });
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_post,
  logout,
};
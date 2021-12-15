'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');
const { httpError } = require('./utils/errors');

const app = express();
app.use(cors());

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, process.env.PORT, process.env.HTTPS_PORT);
} else {
  require('./utils/localhost')(app, process.env.PORT);
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('./uploads/'));
app.use('/thumbnails', express.static('thumbnails'));

app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', { session: false }), postRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);

app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'internal server error',
  });
});

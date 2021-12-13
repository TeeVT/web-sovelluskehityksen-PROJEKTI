'use strict';
// postRoute
const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ dest: './uploads/', fileFilter });
const {
  post_list_get,
  post_get,
  post_post,
  post_put,
  post_delete,
} = require('../controllers/postController');
const router = express.Router();

router
  .route('/')
  .get(post_list_get)
  .post(
    upload.single('post'),
    body('username').notEmpty().escape(),
    post_post
  );

router
  .route('/:id')
  .get(post_get)
  .delete(post_delete)
  .put(
    body('username').notEmpty().escape(),
    post_put
  );

module.exports = router;

"use strict";
const { validationResult } = require("express-validator");
// catController
const {
  getAllPosts,
  getPost,
  addPost,
  modifyPost,
  deletePost,
} = require("../models/postModel");
const { httpError } = require("../utils/errors");

const post_list_get = async (req, res, next) => {
  try {
    const posts = await getAllPost(next);
    if (posts.length > 0) {
      res.json(posts);
    } else {
      next("No posts found", 404);
    }
  } catch (e) {
    console.log("post_list_get error", e.message);
    next(httpError("internal server error", 500));
  }
};

const post_get = async (req, res, next) => {
  try {
    const vastaus = await getPost(req.params.id, next);
    if (vastaus.length > 0) {
      res.json(vastaus.pop());
    } else {
      next(httpError("No post found", 404));
    }
  } catch (e) {
    console.log("post_get error", e.message);
    next(httpError("internal server error", 500));
  }
};

const post_post = async (req, res, next) => {
  console.log("post_post", req.body, req.file, req.user);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("post_post validation", errors.array());
    next(httpError("invalid data", 400));
    return;
  }

  if (!req.file) {
    const err = httpError("file not valid", 400);
    next(err);
    return;
  }

  try {
    const { title } = req.body;
    const tulos = await addPost(
      title,      
      req.user.user_id,      
      req.file.filename,
      next
    );
    if (tulos.affectedRows > 0) {
      res.json({
        message: "post added",
        post_id: tulos.insertId,
      });
    } else {
      next(httpError("No post inserted", 400));
    }
  } catch (e) {
    console.log("post_post error", e.message);
    next(httpError("internal server error", 500));
  }
};

const post_put = async (req, res, next) => {
  console.log("post_put", req.body, req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("post_put validation", errors.array());
    next(httpError("invalid data", 400));
    return;
  }

  try {
    const { title } = req.body;
    /*let user_id = req.user.user_id;
    if (req.user.role === 0) {
      user_id = req.body.user_id;
    }*/

    const owner = req.user.role === 0 ? req.body.owner : req.user.user_id;

    const tulos = await modifyPost(
      title,
      req.params.id,
      req.user.role,
      next
    );
    if (tulos.affectedRows > 0) {
      res.json({
        message: "post modified",
        post_id: tulos.insertId,
      });
    } else {
      next(httpError("No post modified", 400));
    }
  } catch (e) {
    console.log("post_put error", e.message);
    next(httpError("internal server error", 500));
  }
};

const post_delete = async (req, res, next) => {
  try {
    const vastaus = await deletePost(
      req.params.id,
      req.user.user_id,
      req.user.role,
      next
    );
    if (vastaus.affectedRows > 0) {
      res.json({
        message: "post deleted",
        post_id: vastaus.insertId,
      });
    } else {
      next(httpError("No post found", 404));
    }
  } catch (e) {
    console.log("post_delete error", e.message);
    next(httpError("internal server error", 500));
  }
};

module.exports = {
  post_list_get,
  post_get,
  post_post,
  post_put,
  post_delete,
};

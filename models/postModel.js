"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllPosts = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get user_id's name as ownername (from User table).
    const [rows] = await promisePool.execute(`
	SELECT 
	post_id, 
	Post.title,
  filename, 
	Post.user_id,  
	User.username as ownername 
	FROM Post 
	JOIN User ON 
	title = User.user_id`);
    return rows;
  } catch (e) {
    console.error("getAllPosts error", e.message);
    next(httpError("Database error", 500));
  }
};

const getPost = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
      `
	  SELECT 
	  post_id, 
	  title,	   
	  filename,
    Post.user_id,
	  User.username as ownername 
	  FROM Post 
	  JOIN User ON 
	  Post.user_id = User.user_id
	  WHERE post_id = ?`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error("getPost error", e.message);
    next(httpError("Database error", 500));
  }
};

const addPost = async ( title, filename, user_id, next) => {
  try {
    const [rows] = await promisePool.execute(
      "INSERT INTO Post (title, filename, user_id,) VALUES (?, ?, ?)",
      [title, filename, user_id]
    );
    return rows;
  } catch (e) {
    console.error("addPost error", e.message);
    next(httpError("Database error", 500));
  }
};

const modifyPost = async (
  title,
  user_id,
  post_id,
  role,
  next
) => {
  let sql =
    "UPDATE Post SET title = ? WHERE post_id = ? AND Post.user_id = ?;";
  let params = [title, post_id, user_id];
  if (role === 0) {
    sql =
      "UPDATE Post SET title = ?, user_id = ? WHERE post_id = ?;";
    params = [title, user_id, post_id];
  }
  console.log("sql", sql);
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error("addPost error", e.message);
    next(httpError("Database error", 500));
  }
};

const deletePost = async (id, user_id, role, next) => {
  let sql = "DELETE FROM Post WHERE post_id = ? AND user_id = ?";
  let params = [id, user_id];
  if (role === 0) {
    sql = "DELETE FROM Post WHERE post_id = ?";
    params = [id];
  }
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error("getPost error", e.message);
    next(httpError("Database error", 500));
  }
};

module.exports = {
  getAllPosts,
  getPost,
  addPost,
  modifyPost,
  deletePost,
};

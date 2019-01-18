let db = require('../../../db'),
    asyncWrap = require('../../../middleware').asyncWrap,
    createError = require('http-errors');

exports.getAll = asyncWrap(async (req, res, next) => {
  let sql = "SELECT * FROM comments;";
  let comments = await db.query(sql);
  return res.status(200).json(comments);
});

exports.get = asyncWrap(async (req, res, next) => {
  let sql = "SELECT * FROM comments WHERE id = $1;";
  let comments = await db.query(sql, [req.params.id], true);
  if(!comments) return next(createError(404, 'Comments does not exist'));
  return res.status(200).json(comments);
});

exports.put = asyncWrap(async (req, res, next) => {
  let sql = "INSERT INTO comments(plant_id, user_id, comment_text) VALUES($1, $2, $3) RETURNING *;";
  let comment = await db.query(sql, [req.params.plant_id, req.user.user_id, req.body.comment], true);
  return res.status(200).json(comment);
});

exports.delete = asyncWrap(async (req, res, next) => {
  let sql = "DELETE FROM comments WHERE id = $1;";
  let comment = await db.query(sql, [req.params.id], true);
  return res.status(200);
});

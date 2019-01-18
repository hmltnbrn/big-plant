let db = require('../../../db'),
    asyncWrap = require('../../../middleware').asyncWrap,
    createError = require('http-errors');

exports.get = asyncWrap(async (req, res, next) => {
  let sql = "SELECT * FROM plants WHERE id = $1;";
  let plant = await db.query(sql, [req.params.id], true);
  if(!plant) return next(createError(404, 'Plant does not exist'));
  let sql2 = "SELECT c.* FROM plants p, comments c WHERE p.id = c.plant_id AND p.id = $1 ORDER BY c.comment_date DESC;";
  let comments = await db.query(sql2, [req.params.id]);
  let sql3 = "SELECT f.*, d.first_name, d.last_name FROM favorites f, user_details d WHERE f.plant_id = $1 AND f.user_id = d.user_id ORDER BY f.favorite_date DESC;";
  let favorites = await db.query(sql3, [req.params.id]);
  return res.status(200).json({plant, comments, favorites});
});

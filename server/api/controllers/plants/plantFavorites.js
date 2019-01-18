let db = require('../../../db'),
    asyncWrap = require('../../../middleware').asyncWrap,
    createError = require('http-errors');

exports.getAll = asyncWrap(async (req, res, next) => {
  let sql = `WITH y AS (SELECT f.id, f.plant_id, d.first_name, d.last_name FROM favorites f, user_details d WHERE f.user_id = d.user_id ORDER BY f.favorite_date DESC),
  x AS (SELECT p.* FROM plants p)
  SELECT DISTINCT on (x.id) x.id, x.title, x.description, x.image_url, y.id AS favorite_id, y.plant_id, y.first_name, y.last_name FROM x LEFT OUTER JOIN y on x.id = y.plant_id;`;
  let plants = await db.query(sql, []);
  return res.status(200).json(plants);
});

exports.get = asyncWrap(async (req, res, next) => {
  let sql = "SELECT f.*, d.first_name, d.last_name FROM favorites f, user_details d WHERE f.plant_id = $1 AND f.user_id = d.user_id;";
  let favorite = await db.query(sql, [req.params.plant_id], true);
  return res.status(200).json(favorite);
});

exports.put = asyncWrap(async (req, res, next) => {
  let sql = `WITH f AS (INSERT INTO favorites(plant_id, user_id) VALUES($1, $2) ON CONFLICT(user_id) DO UPDATE SET plant_id = EXCLUDED.plant_id RETURNING *),
  d AS (SELECT * FROM user_details)
  SELECT f.*, d.first_name, d.last_name
  FROM f, d WHERE f.user_id = d.user_id;`
  let favorite = await db.query(sql, [req.params.plant_id, req.user.user_id], true);
  return res.status(200).json(favorite);
});

exports.delete = asyncWrap(async (req, res, next) => {
  let sql = "DELETE FROM favorites WHERE plant_id = $1 AND user_id = $2 RETURNING *";
  let favorite = await db.query(sql, [req.params.plant_id, req.user.user_id], true);
  return res.status(200).json(favorite);
});

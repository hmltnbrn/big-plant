let db = require('../../../db'),
    asyncWrap = require('../../../middleware').asyncWrap,
    createError = require('http-errors');

exports.getAll = asyncWrap(async (req, res, next) => {
  let sql = "SELECT * FROM plants";
  let plants = await db.query(sql, []);
  return res.status(200).json(plants);
});

exports.get = asyncWrap(async (req, res, next) => {
  let sql = "SELECT * FROM plants WHERE id = $1";
  let plant = await db.query(sql, [req.params.id], true);
  if(!plant) return next(createError(404, 'Plant does not exist'));
  return res.status(200).json(plant);
});

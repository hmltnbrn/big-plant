let express = require('express'),
    db = require('../db'),
    jwt = require('jsonwebtoken'),
    moment = require('moment'),
    createError = require('http-errors'),
    asyncWrap = require('../middleware').asyncWrap,
    router = express.Router();

router.post('/SignUp', asyncWrap(async (req, res, next) => {
  let user = await db.query("SELECT * FROM bp_sign_up($1, $2, $3, $4, $5)", [req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.email], true, req.body.username + " sign up attempt");
  if(!user.bp_sign_up) return next(createError(400, 'Username or email already in use'));
  return res.status(200).send();
}));

router.post('/SignIn', asyncWrap(async (req, res, next) => {
  let user = await db.query("SELECT * FROM bp_sign_in($1, $2)", [req.body.username, req.body.password], true, req.body.username + " sign in attempt");
  if(!user) return next(createError(400, 'Incorrect username or password'));
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user
  };
  let token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET);
  return res.status(200).json({ id: user.user_id, token: token });
}));

module.exports = router;

let jwt = require('jsonwebtoken'),
    moment = require('moment')
    asyncWrap = require('../middleware').asyncWrap;

exports.checkToken = asyncWrap(async (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    let decode = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_TOKEN_SECRET, { ignoreExpiration: true });
    const now = moment().unix();
    if (now > decode.exp) return res.status(401).json({ status: false, message: 'Your session has expired' });
    else {
      req.user = decode.sub;
      next();
    }
  }
  else {
    return res.status(401).json({ status: false, message: 'Not authorized' });
  }
});

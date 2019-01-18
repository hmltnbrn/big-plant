let express = require('express'),
    plants = require('./controllers/plants'),
    comments = require('./controllers/comments'),
    auth = require('../auth/token'),
    router = express.Router();

router.all('/*', auth.checkToken);

router.use('/Plants', plants);
router.use('/Comments', comments);

module.exports = router;

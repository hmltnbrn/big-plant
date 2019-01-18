let express = require('express'),
    router = express.Router();

let comments = require('./comments');

// api/Comments
router.get('/', comments.getAll);
router.get('/:id', comments.get);
router.put('/:plant_id', comments.put);
router.delete('/:id', comments.delete);

module.exports = router;

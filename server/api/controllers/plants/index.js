let express = require('express'),
    router = express.Router();

let plants = require('./plants');
let plantComments = require('./plantComments');
let plantFavorites = require('./plantFavorites');

// api/Plants/:id/Favorites
router.get('/:plant_id/Favorites', plantFavorites.get);
router.put('/:plant_id/Favorites', plantFavorites.put);
router.delete('/:plant_id/Favorites/:id', plantFavorites.delete);

// api/Plants/:id/Comments
router.get('/:id/Comments', plantComments.get);

// api/Plants/Favorites
router.get('/Favorites', plantFavorites.getAll);

// api/Plants
router.get('/', plants.getAll);
router.get('/:id', plants.get);

module.exports = router;

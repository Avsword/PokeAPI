const express = require('express');

const router = express.Router();

/*

Router basically just tells the API which controller function it should "route"
 the api request to depending on the request type (put, delete etc).

TLDR: Router handles routing.
*/

const {
  getAll,
  getById,
  postNewPokemon,
  deleteById,
  updateById,
  getAllWithPrimaryTyping,
  getWithinHeightRange,
  getWithinWeightRange,
  getByName,
} = require('../controllers/pokemon');

// Assign controller functions to different api endpoints.
// General get route to fetch ALL pokemon
router.get('/', getAll);

// Fetch by Pokédex id.
router.get('/:id', getById);

// Fetch by Pokémon name.
router.get('/name/:name', getByName);

// Get for primary typing
router.get('/typing/:typing', getAllWithPrimaryTyping);

// Get all pokemon in a range of height
router.get('/height/:min&:max', getWithinHeightRange);

// Get all pokemon in a range of weight
router.get('/weight/:min&:max', getWithinWeightRange);

// Posting a new pokemon to the database
router.post('/', postNewPokemon);

// Updating new pokemon by id
router.put('/', updateById);

// Deleting by id
router.delete('/:id', deleteById);

module.exports = router;

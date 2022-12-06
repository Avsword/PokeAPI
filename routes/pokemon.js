const express = require('express');

const router = express.Router();

/*

Router basically just tells the API which controller function it should "route"
 the api request to depending on the request type (put, delete etc).

TLDR: Router handles routing.
*/

// TODO: Add the controller functions
const {
  getAll,
  getById,
  postNewPokemon,
  deleteById,
  updateById,
} = require('../controllers/pokemon');

// TODO: assign controller functions to different api endpoints.
// General get route to fetch ALL pokemon
router.get('/', getAll);

// Fetch by Pokédex id.
router.get('/:id', (req, res) => {
  res.send([req.params]);
});

module.exports = router;

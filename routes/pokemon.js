const express = require('express');

const router = express.Router();

/*

Router basically just tells the API which controller function it should "route"
 the api request to depending on the request type (put, delete etc).

TLDR: Router handles routing.
*/

// TODO: Add the controller functions

// TODO: assign controller functions to different api endpoints.

router.get('/', (req, res) => {
  res.send(['kakka', 'Paris', 'Tampere']);
});

module.exports = router;

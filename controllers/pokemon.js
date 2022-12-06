/*
 In the MVC Pattern, the controller is kind of at the centre of it all.
 It acts in the middle of the model and view to process all logic and incoming requests.

 Controller also handles all of the status responses, which aren't the usual 200.
 We'll also be doing data validation with Joi in the controller. :)
*/
const Joi = require('joi');

const pokeModel = require('../models/pokemon');

// Declare the validation at the highest level, since I'll be using the
//     same validation for multiple functions.
// Create a 'schema' // a 'blueprint' for what the fields should be.
const validation = Joi.object({
  name: Joi.string().min(2).required(),
  imgurl: Joi.string().max(2083).allow(null),
  description: Joi.string().max(1600).allow(null),
  primarytyping: Joi.string().min(3).max(10).required(),
  secondarytyping: Joi.string().min(3).max(10).allow(null),
  height: Joi.number().max(10000).allow(null),
  weight: Joi.number().max(10000).allow(null),
  ID: Joi.number().integer().required(),
});

// Each function has a trycatch for catching internal server errors.

const getAll = async (req, res) => {
  try {
    const response = await pokeModel.getAll();
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const getById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const response = await pokeModel.getById(id);
    // Check if the model responds with anything valid
    if (response.length === 1) {
      // Was found in database
      res.send(response[0]);
    } else {
      // 404, bad request
      res
        .status(404)
        .send('Could not find a Pokemon in the database with an id of ', id);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const postNewPokemon = async (req, res) => {
  // compare the request body with the schema and validate the incoming data
  const err = validation.validate(req.body).error;

  if (err) {
    // If the schema fails to validate one or more fields...
    res.status(404).send(err.details[0].message);
  } else {
    const newPokemon = {
      name: req.body.name,
      imgurl: req.body.imgurl,
      description: req.body.description,
      primarytyping: req.body.primarytyping,
      secondarytyping: req.body.secondarytyping,
      height: req.body.height,
      weight: req.body.weight,
      ID: req.body.ID,
    };
    try {
      const response = await pokeModel.postNewPokemon(newPokemon);
      if (response) {
        res.status(201).send(newPokemon);
      }
    } catch (error) {
      res
        .status(500)
        .send('Something went wrong with the server. Check the ID');
    }
  }
};

const deleteById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await pokeModel.deleteById(id);
    // If no rows were affected, then the request was bad (nothing was deleted)
    if (result.affectedRows === 0) {
      res.status(404).send('Not Found');
    } else {
      res.status(200).send(`Pokémon with the id ${id} has been deleted`);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateById = async (req, res) => {
  // compare the request body with the schema and validate the incoming data
  const err = validation.validate(req.body).error;
  if (err) {
    // If the schema fails to validate one or more fields...
    res.status(404).send(err.details[0].message);
    // Exit function should there be any issues.
    return;
  }
  const updatedPokemon = {
    name: req.body.name,
    imgurl: req.body.imgurl,
    description: req.body.description,
    primarytyping: req.body.primarytyping,
    secondarytyping: req.body.secondarytyping,
    height: req.body.height,
    weight: req.body.weight,
    ID: req.body.ID,
  };
  try {
    const response = await pokeModel.updateById(updatedPokemon);
    console.log(response);
    // If rows were changed -> a row was updated
    if (response.changedRows !== 0) {
      res.send(updatedPokemon);
    } else {
      res.status(404).send('No rows were changed.');
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports = {
  getAll,
  getById,
  deleteById,
  postNewPokemon,
  updateById,
};

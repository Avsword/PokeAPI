/* eslint-disable comma-dangle */
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
  ID: Joi.number().integer().min(0).required(),
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
      res.status(404).send('Sorry, could not find a Pokemon with that id :(');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const getAllWithPrimaryTyping = async (req, res) => {
  const validateTyping = Joi.string().min(3).max(10).required();
  const err = validateTyping.validate(req.params.typing).error;
  if (err) {
    res.status(404).send(err.details[0].message);
  } else {
    try {
      const typingInLowerCase = req.params.typing;
      const resp = await pokeModel.getAllWithPrimaryTyping(typingInLowerCase);
      if (resp.length > 0) {
        res.send(resp);
      } else {
        res.status(404).send('No matching typing');
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

const getWithinHeightRange = async (req, res) => {
  // Could've validated with a joi object, but. oh well
  const validateparams = Joi.number().min(0);
  const min = parseFloat(req.params.min, 10);
  const max = parseFloat(req.params.max, 10);
  let err = validateparams.validate(min).error;
  err = validateparams.validate(max).error;

  if (err) {
    res.status(404).send(err.details[0].message);
  } else {
    try {
      const resp = await pokeModel.getWithinHeightRange(min, max);
      if (resp) {
        res.send(resp);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

const getWithinWeightRange = async (req, res) => {
  // Could've validated with a joi object, but. oh well
  const validateparams = Joi.number().min(0);
  const min = parseFloat(req.params.min, 10);
  const max = parseFloat(req.params.max, 10);
  let err = validateparams.validate(min).error;
  err = validateparams.validate(max).error;

  if (err) {
    res.status(404).send(err.details[0].message);
  } else {
    try {
      const resp = await pokeModel.getWithinWeightRange(min, max);
      if (resp) {
        res.send(resp);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

const postNewPokemon = async (req, res) => {
  // compare the request body with the schema and validate the incoming data
  const err = validation.validate(req.body).error;

  if (err) {
    // If the schema fails to validate one or more fields...

    res.status(404).send(err.details[0].message);
  } else {
    // We want all names and typings to be in lowercase.
    // Sure, this could also be done in the frontend, but.. eh
    const nameLC = req.body.name.toString().toLowerCase();
    const ptypingLC = req.body.primarytyping.toString().toLowerCase();
    let stypingLC;
    if (req.body.secondarytyping !== null) {
      stypingLC = req.body.secondarytyping.toString().toLowerCase();
    } else {
      stypingLC = req.body.secondarytyping;
    }

    const newPokemon = {
      name: nameLC,
      imgurl: req.body.imgurl,
      description: req.body.description,
      primarytyping: ptypingLC,
      secondarytyping: stypingLC,
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
    res.status(400).send(err.details[0].message);
    // Exit function should there be any issues.
    return;
  }
  const nameLC = req.body.name.toString().toLowerCase();
  const ptypingLC = req.body.primarytyping.toString().toLowerCase();
  const stypingLC = req.body.secondarytyping.toString().toLowerCase();
  const updatedPokemon = {
    name: nameLC,
    imgurl: req.body.imgurl,
    description: req.body.description,
    primarytyping: ptypingLC,
    secondarytyping: stypingLC,
    height: req.body.height,
    weight: req.body.weight,
    ID: req.body.ID,
  };
  try {
    const response = await pokeModel.updateById(updatedPokemon);
    // If rows were changed -> a row was updated
    if (response.changedRows !== 0) {
      res.status(200).send(updatedPokemon);
    } else {
      res.status(405).send('ID not found OR no rows were changed');
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
  getAllWithPrimaryTyping,
  getWithinHeightRange,
  getWithinWeightRange,
};

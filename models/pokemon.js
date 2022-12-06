// TODO: Never use airbnb eslint again :D
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */

/*
Models manage the API data. We pass the model functions to the route.
Models define HOW each function interacts with the database. Very cool!
*/

const connection = require('../db/connection');

// All return a promise, since the database could be slow.
const pokemonModel = {
  // Sanitize the inputs with a questionmark
  getAll: () =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM pokemon', (err, result) => {
        err ? reject(err) : resolve(result);
      });
    }),

  getById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM pokemon WHERE id=?',
        id,
        (err, result) => {
          err ? reject(err) : resolve(result);
        }
      );
    }),
  postNewPokemon: (pokemon) =>
    new Promise((resolve, reject) => {
      connection.query('INSERT INTO pokemon SET ?', pokemon, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      connection.query('DELETE FROM pokemon WHERE id=?;', id, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    }),
  updateById: (pokemon) =>
    new Promise((resolve, reject) => {
      connection.query(
        'UPDATE pokemon SET name=?, imgurl=?, description=?, primarytyping=?, secondarytyping=?, height=?, weight=? WHERE ID=?;',
        // Sanitize multiple with an array.
        [
          pokemon.name,
          pokemon.imgurl,
          pokemon.description,
          pokemon.primarytyping,
          pokemon.secondarytyping,
          pokemon.height,
          pokemon.weight,
          pokemon.ID,
        ],
        (err, result) => {
          err ? reject(err) : resolve(result);
        }
      );
    }),
};

module.exports = pokemonModel;

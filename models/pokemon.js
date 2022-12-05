const connection = require('../db/connection');

const pokemonModel = {
  getAll: () =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM pokemon', (err, result) => {
        err ? reject(err) : resolve(result);
      });
    }),
};

module.exports = pokemonModel;

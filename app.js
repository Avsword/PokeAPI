/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/*
App.js holds our express app + all middleware. 

Needed to separate app.js + index.js for Render
*/

const express = require('express');
const cors = require('cors');
const pokeRouter = require('./routes/pokemon');

/* Creates an Express application.  */
const app = express();

// Middleware for parsing data to json.
app.use(express.json());

// Middleware for using cors. We want only certain origins to allow to create fetch's
/*

      'http://localhost:3000',
      'https://pokedex-api-88gv.onrender.com',
      'https://editor.swagger.io',
*/
app.use(
  cors(['http://localhost:3000', 'https://pokedex-api-88gv.onrender.com'])
);

// Router handles passing requests further.
app.use('/api/pokemon', pokeRouter);

// Health status for Render
app.get('/health', (req, res) => {
  res.send('OK');
});

// Frontend implementation
app.use(express.static('frontend/build'));

module.exports = app;

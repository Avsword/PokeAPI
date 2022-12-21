/* eslint-disable no-trailing-spaces */
/*
App.js holds our express app + all middleware. 

Needed to separate app.js + index.js for Render
*/
const express = require('express');
/* Creates an Express application.  */
const app = express();

const pokeRouter = require('./routes/pokemon');

// Middleware for parsing data to json.
app.use(express.json());
// Router handles passing requests further.
app.use('/api/pokemon', pokeRouter);

// Health status for Render

app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;

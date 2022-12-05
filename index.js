/* const app = require('./app');

require('dotenv').config();

const port = process.env.MYSQL_PORT || 3000;

app.listen(port, () => {
  console.log('app listening on port: ', port);
});

*/
/* // Require express returns a function
const express = require('express');
const route = require('./routes/pokemon');

// Calling the express() creates an express application which assign to app
const app = express();
 */
const app = require('./app');

require('dotenv').config();

const port = process.env.MYSQL_PORT || 3000;

// the app get method will respond to GET requests
// the method takes two arguments, the route to listen respond to
// callback function with two arguments, the request and the response
// callback function is also called the route handler
/* app.use('/api/pokemon', route); */

// Call the app listen method and give the port as first arguments
// There is callback which called when app starts listening
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

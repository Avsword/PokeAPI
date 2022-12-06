// Define the connection here for minimizing repetition + clearer
const mysql = require('mysql');
require('dotenv').config();

// Create a conneciton pool for optimizing database performance.
// Pooling allows for existing connections to be used again and not needing to create a new
//  connection every time.
const connection = mysql.createPool({
  connectionLimit: 5,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = connection;

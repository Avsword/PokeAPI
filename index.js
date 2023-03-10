const app = require('./app');

// required for port
require('dotenv').config();

const port = process.env.MYSQL_PORT || 3000;

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

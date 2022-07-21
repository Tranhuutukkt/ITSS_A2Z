const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');

const app = express();
app.use(cors());

require('./startup/db')();
require('./startup/routers')(app);

const port = process.env.SER_PORT || 5555;

const server = app.listen(port, () => console.log(`Listening to port ${port}... `));

module.exports = server;
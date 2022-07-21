const express = require('express');
const winston = require('winston');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');

const app = express();
app.use(cors());

require('./startup/db')();
require('./startup/logging')();
require('./startup/routers')(app);

const port = process.env.PORT || 5555;

const server = app.listen(port, () => winston.info(`Listening to port ${port}... `));

module.exports = server;
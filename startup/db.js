const mongoose = require('mongoose');
const winston = require('winston')

module.exports = function () {
    const uri = process.env.DB;
    mongoose.connect(uri).then(
        () => winston.info(`Connect to ${uri}... `),
    )
};
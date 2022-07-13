const mongoose = require('mongoose');

module.exports = function () {
    const uri = process.env.DB;
    mongoose.connect(uri).then(
        () => console.log(`Connect to ${uri}... `),
    )
};
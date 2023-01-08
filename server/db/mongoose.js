var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://127.0.0.1/hospitaldb");

module.exports = { mongoose };
const mongoose = require('mongoose');
const _ = require('lodash');
var { scoreOfDisease, Disease } = require('./diseases.js');
var rooms = require('./rooms.js');

// User Schema
var DoctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    sex: {
        // true = male
        // false = female
        type: Boolean,
        required: true,
        default: true
    },
    DoctorID: {
        type: String,
        required: true,
        unique: true
    },
    Qualification: {
        type: String,
        required: true,

    },
    Specialization: {
        type: String,
        required: true,

    },
    lastUpdate: {
        type: Number,
        required: true
    }
});


var Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = { Doctor };
const mongoose = require('mongoose');
const _ = require('lodash');
var { scoreOfDisease, Disease } = require('./diseases.js');
var rooms = require('./rooms.js');

// User Schema
var AppointmentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true,

    },

    appointmentID: {
        type: String,
        required: true,
        unique: true
    },
    Doctor: {
        type: String,
        required: true,

    },
    Date: {
        type: String,
        required: true,

    }
});


var Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = { Appointment };
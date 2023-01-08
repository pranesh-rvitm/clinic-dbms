const express = require('express');
const _ = require('lodash');
const router = express.Router();

var { scoreOfDisease, Disease } = require('../server/models/diseases.js');
var { Doctor } = require('../server/models/doctor.js');
var { rooms, Room } = require('../server/models/rooms.js');
var isValidDate = require('is-valid-date');
const { ObjectID } = require('mongodb');


router.get('/app/adddoctor', (req, res) => {
    res.render('adddoctor', { pageTitle: "Add Doctor" });
});

router.get('/app/getdoctors', (req, res) => {
    res.render('getdoctors', { pageTitle: "All Doctors" });
});




router.get('/app/getdocdetail', (req, res) => {
    console.log('inside doctors');
    Doctor.find({}).then((doctors) => {
        console.log(doctors);
        res.status(200).send(doctors);
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/app/getdoctorsjson', (req, res) => {
    Doctor.find({}, null, { firstName: 1, _id: 0 }).then((doctor) => {
        var doctorJSON = {};
        // rooms is an array with all roomss
        for (var i = 0; i < doctor.length; ++i) {
            doctorJSON[doctor[i].DoctorID] = doctor[i].firstName;
        }
        console.log(JSON.stringify(doctorJSON));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(doctorJSON));

    }).catch((err) => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send('error occured');
    });
});


router.post('/app/adddoctor', (req, res) => {
    console.log("entered");
    var dateOfBirth = req.body.dateOfBirth;
    // Check for empty fields
    if (_.isEmpty(req.body.firstName) || _.isEmpty(req.body.lastName) || !isValidDate(dateOfBirth)) {
        if (_.isEmpty(req.body.firstName)) req.flash('error_msg', 'Please enter the first name.');
        if (_.isEmpty(req.body.lastName)) req.flash('error_msg', 'Please enter the last name.');
        if (!isValidDate(dateOfBirth)) req.flash('error_msg', 'The date is not valid.');

        res.status(400).redirect('/app/adddoctor');
    } else {
        console.log("entered inside");
        // set the sex of the new doctor
        var sex = req.body.sex;
        if (sex === "male") {
            sex = true;
        } else {
            sex = false;
        }

        // make a new doctor and add it in the database
        var doctor = Doctor({
            firstName: _.capitalize(req.body.firstName),
            lastName: _.capitalize(req.body.lastName),
            sex: sex,
            dateOfBirth: dateOfBirth,
            DoctorID: _.toUpper(req.body.DoctorID),
            Qualification: req.body.qualification,
            Specialization: req.body.specialization,
            lastUpdate: (new Date().getTime())
        });
        console.log(doctor);

        doctor.save().then((doctor) => {
            // doctor.updateScore();
            res.status(200).redirect('/app');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/app');
        });
    }
});



module.exports = router;
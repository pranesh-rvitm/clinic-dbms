const express = require('express');
const _ = require('lodash');
const router = express.Router();

var { Appointment } = require('../server/models/appointment.js');
var isValidDate = require('is-valid-date');
const { ObjectID } = require('mongodb');


router.get('/app/appointments', (req, res) => {
    res.render('appointment', { pageTitle: "All Appointments" });
});





router.get('/app/getappointmentdetail', (req, res) => {
    console.log('inside appointments');
    Appointment.find({}).then((doctors) => {
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

router.get('/app/doctor/:hospitalNumber', (req, res) => {
    DoctorID = req.params.hospitalNumber;
    var docto = Doctor.findOne({ DoctorID });
    Doctor.findOne({
        DoctorID
    }).then((doctor) => {
        if (_.isEmpty(doctor)) {
            throw Error('Doctor does not exist');
        }
        res.status(200).render('doctorPage');
    }).catch((err) => {
        console.log(err);
        res.status(404).redirect('/app');
    });
});

router.get('/app/getdoctor/:DoctorID', (req, res) => {
    DoctorID = req.params.DoctorID;
    Doctor.findOne({
        DoctorID
    }).then((doctor) => {
        res.status(200).send(doctor);
    }).catch((err) => {
        req.flash('error_msg', 'Please enter the first name.');
        res.status(404).redirect('/app');
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
router.get('/app/deletedoctor/:DoctorID', (req, res) => {
    var DoctorID = req.params.DoctorID;
    //res.send("hi");
    Doctor.remove({ DoctorID }).then((patients) => {
        res.status(200).redirect('/app');
    });

});





module.exports = router;
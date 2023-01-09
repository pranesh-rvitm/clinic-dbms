var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var DoctorID = window.location.pathname.split('/');

    var patientAPI = URL + "/app/getdoctor/" + DoctorID[3];

    $("#form-patient").attr("action", "/app/updatepatient/" + DoctorID[3]);
    $("#delete-button").attr("href", "/app/deletedoctor/" + DoctorID[3]);

    $.getJSON(patientAPI).done(function(patient) {
        $("#first-name-disabled").attr("placeholder", patient["firstName"]);
        $("#last-name-disabled").attr("placeholder", patient["lastName"]);
        $("#hospitalNumber-disabled").attr("placeholder", patient["DoctorID"]);
        $("#date-of-birth-disabled").attr("placeholder", patient["dateOfBirth"]);
        $("#patient-specialization-disabled").attr("placeholder", patient["Specialization"]);
        $("#patient-Qualification-disabled").attr("placeholder", patient["Qualification"]);



        /*
               Sex of the patient
        */
        if (patient["sex"] === true) {
            $("#patient-sex-disabled").attr("placeholder", "Male");
        } else if (patient["sex"] === false) {
            $("#patient-sex-disabled").attr("placeholder", "Female");
        }




    });
});
var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var DoctorID = window.location.pathname.split('/');

    var patientAPI = URL + "/app/getdoctor/" + DoctorID[3];

    $("#form-patient").attr("action", "/app/updatepatient/" + DoctorID[3]);
    $("#delete-button").attr("href", "/app/deletedoctor/" + DoctorID[3]);

    $.getJSON(patientAPI).done(function(patient) {
        $("#first-name-disabled").attr("placeholder", patient["firstName"]);
        $("#last-name-disabled").attr("placeholder", patient["lastName"]);
        $("#hospitalNumber-disabled").attr("placeholder", patient["DoctorID"]);
        $("#date-of-birth-disabled").attr("placeholder", patient["dateOfBirth"]);
        $("#patient-score").html(patient["DoctorID"]);


        /*
               Sex of the patient
        */
        if (patient["sex"] === true) {
            $("#patient-sex-disabled").attr("placeholder", "Male");
        } else if (patient["sex"] === false) {
            $("#patient-sex-disabled").attr("placeholder", "Female");
        }



    });
});
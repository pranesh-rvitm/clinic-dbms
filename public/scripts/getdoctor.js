var URL = location.protocol + '//' + location.host;

var patientsWaitingTableConstructor = [];
var patientsInHospitalTableConstructor = [];
var doctorsInHospitalTableConstructor = [];
var freeRoomsTableConstructor = [];
var dynamicTableClickable = true;
var size = 0;

$(document).ready(function() {
    var doctorsAPI = URL + "/app/getdocdetail";
    $.getJSON(doctorsAPI).done(function(doctors) {
        size = doctors.length;
        $("#free-rooms-live").html(doctors.length);

        for (var i = 0; i < doctors.length; i++) {
            var patient = doctors[i];
            var patientsRowConstructor = [];
            patientsRowConstructor.push(patient["DoctorID"]);
            patientsRowConstructor.push(patient["firstName"] + " " + patient["lastName"]);
            patientsRowConstructor.push(patient["Specialization"]);
            patientsRowConstructor.push(patient["Qualification"]);
            patientsInHospitalTableConstructor.push(patientsRowConstructor);
        }







        $('#patients-in-hospital').DataTable({
            data: patientsInHospitalTableConstructor,
            columns: [{
                title: "<span class=\"fa fa-hospital-o fa-fw\" style=\"color: black;\"></span>   " + "  ID",
                width: "25%"
            }, {
                title: "Doctor Name",
                width: "45%"
            }, {
                title: "Department",
                width: "35%"
            }, {
                title: "Qualification",
                width: "35%"
            }],

            paging: false,
            resposnive: true,
            info: false,
            language: {
                searchPlaceholder: "Search patient in room...",
                sSearch: ""
            },
            aaSorting: [
                [3, 'desc']
            ],
            fnCreatedRow: function(nRow, aData, iDisplayIndex) {
                // nRow - this is the HTML element of the row
                // aData - array of the data in the columns. Get column 4 data: aData[3]
                // iDataIndex - row index in the table

                // color the Score field
                if (aData[3] >= 35) { // red
                    $('td:eq(3)', nRow).css("background-color", "#ffad99");
                } else if (aData[3] >= 20) { // orange
                    $('td:eq(3)', nRow).css("background-color", "#ffdd99");
                } else if (aData[3] >= 10) { // yellow
                    $('td:eq(3)', nRow).css("background-color", "#ffffcc");
                }
            }
        });
    });




});


var clicks = 0;

$(function() {
    $("body").on("click", '#patients-in-hospital > tbody > tr', function(e) {
        var hospitalNumberToBeWaiting = $(this).children('td')[0];
        hospitalNumberToBeWaiting = hospitalNumberToBeWaiting.textContent;
        clicks++;
        var clicks_when_called = clicks;

        $("body").on('click', '#patients-waiting > tbody > tr', function() {
            var hospitalNumberToBeAdmitted = $(this).children('td')[0];
            hospitalNumberToBeAdmitted = hospitalNumberToBeAdmitted.textContent;
            if (clicks_when_called + 1 === clicks) {
                if (confirm('Do you want to make the change?')) {
                    window.location.href = URL + "/app/swappatients/" + hospitalNumberToBeWaiting + "/" + hospitalNumberToBeAdmitted;
                } else {
                    window.location.href = URL + "/app/";
                }
            }
        });
    });
});




$("body").on('dblclick', '#patients-in-hospital > tbody > tr', function() {
    var NHSnumber = $(this).children('td')[0];
    NHSnumber = NHSnumber.textContent;
    window.location.href = URL + "/app/patient/" + NHSnumber;
});

/*
     Google analytics
*/
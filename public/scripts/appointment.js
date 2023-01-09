var URL = location.protocol + '//' + location.host;

var patientsWaitingTableConstructor = [];
var patientsInHospitalTableConstructor = [];
var doctorsInHospitalTableConstructor = [];
var freeRoomsTableConstructor = [];
var dynamicTableClickable = true;
var size = 0;

$(document).ready(function() {
    var appointmentAPI = URL + "/app/getappointmentdetail";
    $.getJSON(appointmentAPI).done(function(doctors) {
        size = doctors.length;
        $("#free-rooms-live").html(doctors.length);

        for (var i = 0; i < doctors.length; i++) {
            var patient = doctors[i];
            var patientsRowConstructor = [];
            patientsRowConstructor.push(i + 1);
            patientsRowConstructor.push(patient["appointmentID"]);
            patientsRowConstructor.push(patient["firstName"] + " " + patient["lastName"]);
            patientsRowConstructor.push(patient["Doctor"]);
            patientsRowConstructor.push(patient["Date"]);
            patientsInHospitalTableConstructor.push(patientsRowConstructor);
        }
        $('#patients-in-hospital').DataTable({
            data: patientsInHospitalTableConstructor,
            columns: [{
                    title: "<span class=\"fa fa-hospital-o fa-fw\" style=\"color: black;\"></span>   " + "  Si. No.",
                    width: "25%"
                }, {
                    title: "Appointment ID",
                    width: "25%"
                }, {
                    title: "Name",
                    width: "45%"
                }, {
                    title: "Doctor",
                    width: "45%"
                },
                {
                    title: "Appointment Date",
                    width: "35%"
                }
            ],

            paging: false,
            resposnive: true,
            info: false,
            language: {
                searchPlaceholder: "Search appointment",
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



$("body").on('dblclick', '#patients-in-hospital > tbody > tr', function() {
    var NHSnumber = $(this).children('td')[0];

    window.location.href = URL + "/app/";
});

/*
     Google analytics
*/
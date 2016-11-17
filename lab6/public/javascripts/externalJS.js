// studentList data array for filling in info box
var studentListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/studentList', function( data ) {
        studentListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowstudent" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeletestudent" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#studentList table tbody').html(tableContent);
    });
};

// Show Student Info
function showStudentInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve student name from link rel attribute
    var thisStudentName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = studentListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisStudentName);

    // Get our student Object
    var thisStudentObject = studentListData[arrayPosition];

    //Populate Info Box
    $('#studentInfoName').text(thisStudentObject.name);
    $('#studentInfoMajor').text(thisStudentObject.major);
    $('#studentInfoGender').text(thisStudentObject.gender);
    $('#studentInfoID').text(thisStudentObject.studentID);

};

 // student name link click
$('#studentList table tbody').on('click', 'td a.linkshowstudent', showStudentInfo);

// Add Student
function addStudent(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addStudent input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all student information into one object
        var newStudent = {
            'name': $('#addStudent fieldset input#inputStudentName').val(),
            'email': $('#addStudent fieldset input#inputStudentEmail').val(),
            'major': $('#addStudent fieldset input#inputStudentMajor').val(),
            'gender': $('#addStudent fieldset input#inputStudentGender').val(),
            'studentID': $('#addStudent fieldset input#inputStudentID').val(),
        }

        // Use AJAX to post the object to our addstudent service
        $.ajax({
            type: 'POST',
            data: newStudent,
            url: '/users/addstudent',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addStudent fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Add Student button click
$('#btnAddStudent').on('click', addStudent);

// Delete student link click
$('#studentList table tbody').on('click', 'td a.linkdeletestudent', deleteStudent);

// Delete Student
function deleteStudent(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this student?');

    // Check and make sure the student confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deletestudent/' + $(this).attr('rel')
        }).done(function( response ) {

            if(response.msg === ''){
                populateTable();
            }
            else{
                alert('Error: ' + response.msg);
            }

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

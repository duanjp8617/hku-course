'use strict';

var studentListApp = angular.module('studentList', []);

studentListApp.controller("StudentListController", function StudentListController($scope, $http){
    $scope.existing_student = {name:"", email:"", major:"", gender:"", studentID:"", _id:""};

    var getStudents = function(){
      $http.get("/users/studentList").then(function(response){
        $scope.students = response.data;
      }, function(response){
        alert("Error getting students.");
      });
    };

    getStudents();

    $scope.showStudent = function(student){
      $scope.existing_student = student;
    };

    $scope.deleteStudent = function(id){
      var url = "/users/deletestudent/"+id;
      $http.delete(url).then(function(response){
        if(response.data.msg===''){
          getStudents();
        }
        else{
          alert("Error deleting students.");
        }
      }, function(response){
        alert("Error deleting students.");
      });
    };

    $scope.addStudent = function(student){
      $http.post("/users/addstudent", student).then(function(response){
        if(response.data.msg===''){
          getStudents();
        }
        else{
          alert("Error adding student.");
        }
      }, function(response){
        alert("Error adding student.");
      });
    };
})
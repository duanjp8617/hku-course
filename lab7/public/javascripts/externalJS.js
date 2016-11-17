'use strict';

var studentListApp = angular.module('studentList', []);

studentListApp.controller("StudentListController", function StudentListController($scope){
    $scope.existing_student = {name:'fk', major:'fk', gender:'fk', studentid:'fk'};
})
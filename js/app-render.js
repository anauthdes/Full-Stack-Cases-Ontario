//Script for Angular app
console.log("I am running!");
var app = angular.module('casedata', []);

app.controller('caseCtrl', function($scope) {
    $scope.startdate = new Date();
    $scope.enddate = new Date();
    
});
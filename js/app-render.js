//Script for Angular app
console.log("I am running!");
var app = angular.module('casedata', []);

readTextFile("temp/data.txt", app);


function readTextFile(file, app) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                console.log(allText);
                var info = JSON.parse(allText);
                runCaseControler(app,info);
                // return allText;
            }
        }
    }
    rawFile.send(null);
    //return '{"result":{"total":0}}';
}

function runCaseControler(app, info) {
    console.log("info: ", info);

    var reportDate = new Date(info.result.records[0]["Reported Date"]);

    app.controller('caseCtrl', function($scope) {
        $scope.reportdate = reportDate.getFullYear() + " - " + addLeadingZero(reportDate.getMonth() + 1) + " - " + addLeadingZero(reportDate.getDate() );
        $scope.sumcases = info.result.records[0]["Total Cases"];
        $scope.activecases = info.result.records[0]["Confirmed Positive"];
        $scope.curedcases = info.result.records[0]["Resolved"];
        $scope.deathcases = info.result.records[0]["Deaths"];
        $scope.investigationcases = info.result.records[0]["Total patients approved for testing as of Reporting Date"];
        $scope.hospitalcases = info.result.records[0]["Number of patients hospitalized with COVID-19"];
    });
}

function addLeadingZero(num){
    if(Math.abs(num) < 10){
        return "0" + Math.abs(num).toString;
    }
    return num;
}
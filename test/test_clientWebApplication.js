var win95Theme = require("../source/index.js");
var win95Explorer = win95Theme.explorer;
var startQueue = win95Theme.queue;

var app = angular.module("myApp", []);
var window1 = {
  name: "My Test",
  size : { width: "200px", height: "800px"},
  overflow: "y-scroll",
  state: "default",
};

var window2 = {
  name: "my window 2",
  overflow: "y-scroll"
};

var programs = [window1, window2];
app.directive("win95theme", win95Explorer);
app.controller("testcontentcontroller", ['$scope', function($scope) {
  $scope.windowsthemedata = programs[0];
  $scope.windowsthemedata2 = programs[1];
}]);


app.directive("startqueue", startQueue);
app.controller("testqueuecontroller", ['$scope', function($scope){
  $scope.programs = programs;
  $scope.queuedata = {};//manually set height; absolute vs relative<-- default

}]);

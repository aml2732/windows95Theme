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

var window3 = {
  name: "my window 3",
  overflow:"y-scroll",
  size: { width: "200px", height: "100px"},
  position: {x: "5px", y:"5px;"}
};

var programs = [window1, window2, window3];
app.directive("win95theme", win95Explorer);
app.controller("testcontentcontroller", ['$scope', function($scope) {
  $scope.windowsthemedata = programs[0];
  $scope.windowsthemedata2 = programs[1];
  $scope.windowsthemedata3 = programs[2];
}]);


app.directive("startqueue", startQueue);
app.controller("testqueuecontroller", ['$scope', function($scope){
  $scope.programs = programs;
  $scope.queuedata = {};//manually set height; absolute vs relative<-- default
}]);

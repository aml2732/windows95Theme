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
  position: {x: "5", y:"5"},
  zindex: "5"
};

var window4 = {
  name: "my window 4",
  size: { width: "250px", height: "300px"},
  position: {x: "50", y:"50"}
};

var programs = [window1, window2, window3, window4];
app.directive("win95theme", win95Explorer);
app.controller("testcontentcontroller", ['$scope', function($scope, $rootScope) {
  $scope.windowsthemedata = programs[0];
  $scope.windowsthemedata2 = programs[1];
  $scope.windowsthemedata3 = programs[2];
  $scope.windowsthemedata4 = programs[3];
}]);


app.directive("startqueue", startQueue);
app.controller("testqueuecontroller", ['$scope', function($scope, $rootScope){
  $scope.programs = programs;
  $scope.queuedata = {};//manually set height; absolute vs relative<-- default
}]);

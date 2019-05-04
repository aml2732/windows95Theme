var app = angular.module("myApp", []);
var window1 = {
  name: "My Test",
  size : { width: "200px", height: "800px"},
  overflow: "y-scroll",
  state: "default",
  position: {x: "100", y:"300"},
};

var window2 = {
  name: "my window 2",
  overflow: "y-scroll",
  position: {x: "200", y:"250"},
};

var window3 = {
  name: "my window 3",
  overflow:"y-scroll",
  size: { width: "200px", height: "100px"},
  position: {x: "400", y:"10"},
  zindex: "5"
};

var window4 = {
  name: "my window 4",
  size: { width: "250px", height: "300px"},
  position: {x: "550", y:"50"}
};

var programs = [window1, window2, window3, window4];
app.directive("win95theme", win95.explorer);
app.controller("testcontentcontroller", ['$scope', function($scope, $rootScope) {
  $scope.windowsthemedata = programs[0];
  $scope.windowsthemedata2 = programs[1];
  $scope.windowsthemedata3 = programs[2];
  $scope.windowsthemedata4 = programs[3];
}]);

app.directive("startqueue", win95.queue);
app.controller("testqueuecontroller", ['$scope', function($scope, $rootScope){
  $scope.programs = programs;
  $scope.queuedata = {};//manually set height; absolute vs relative<-- default
}]);

var win95Directive = require("../source/win95Directive.js")
var app = angular.module("myApp", []);
app.directive("win95theme", win95Directive);
app.controller("testparentcontroller", ['$scope', function($scope) {
  $scope.windowsthemedata = {
    closed : false
  }
}]);

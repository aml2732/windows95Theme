module.exports = function() {
    return {
        scope: {
          "subject": "=",
          "options": "="
        },
        controller: function($scope){
          $scope.close = function(){
            $scope.options.closed = true;
          }

          $scope.maximize = function(){
            $scope.options.maximized = !$scope.options.maximized;
          }

        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}

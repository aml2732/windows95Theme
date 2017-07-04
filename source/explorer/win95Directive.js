module.exports = function() {
    return {
        scope: {
          "options": "="
        },
        controller: function($scope){
          $scope.close = function(){
            $scope.options.closed = true;
          }

          $scope.maximize = function(){
            $scope.options.maximized = !$scope.options.maximized;
          }

          $scope.minimize = function(){
            $scope.options.minimized = true;
          }

        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}

module.exports = function() {
    return {
        scope: {
          "options": "="
        },
        controller: function($scope){
          $scope.close = function(){
            $scope.options.oldState = $scope.options.state || "default";
            $scope.options.state = "closed";
          }

          $scope.maximize = function(){
            if($scope.options.state == "maximized"){
              $scope.options.oldState = "maximized";
              $scope.options.state = "default"
            }
            else{
              $scope.options.oldState = "default";
              $scope.options.state = "maximized"
            }
          }

          $scope.minimize = function(){
            $scope.options.oldState = $scope.options.state || "default";
            $scope.options.state = "minimized";
          }

        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}

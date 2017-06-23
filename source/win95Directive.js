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
        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}

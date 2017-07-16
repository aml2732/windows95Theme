module.exports = function() {
    return {
        scope: {
          "options": "="
        },
        controller: function($scope, $rootScope){
          $scope.close = function(){
            $scope.options.oldState = $scope.options.state || "default";
            $scope.options.state = "closed";
          };

          $scope.maximize = function(){
            if($scope.options.state == "maximized"){
              $scope.options.oldState = "maximized";
              $scope.options.state = "default"
            }
            else{
              $scope.options.oldState = "default";
              $scope.options.state = "maximized"
            }
          };

          $scope.minimize = function(){
            $scope.options.oldState = $scope.options.state || "default";
            $scope.options.state = "minimized";
          };

          $scope.selectWindow = function(){
            $rootScope.$emit("winzmax", [$scope.options.name]);
          };

        },
        link: function(scope, el, attrs, controller){

          el.bind("dragstart", function(event){
            var position = {
              x: event.x,
              y: event.y
            };
            scope.oldPosition = position;
          });

          /*
            It is important to find the difference between old and new position BECAUSE if you select the div in the middle.
            x,y and corresponding clentX, pageX will similarly reference that point you clicked -NOT the start of the div/directive
          */
          el.bind("dragend", function(event){
            scope.options.position = scope.options.position || {};
            var oldPosition = scope.oldPosition;
            var offsetX = event.x - oldPosition.x;
            var offsetY = event.y - oldPosition.y;
            scope.options.position.x = parseInt(scope.options.position.x) || 0;
            scope.options.position.y = parseInt(scope.options.position.y) || 0;
            scope.options.position.x += offsetX;
            scope.options.position.y += offsetY;
            scope.$apply()
          });
        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}

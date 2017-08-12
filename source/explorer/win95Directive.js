module.exports = function() {
    return {
        scope: {
          "options": "="
        },
        controller: function($scope, $rootScope, $document){
          $scope.close = function(){
            $scope.options.oldState = $scope.options.state || "default";
            $scope.options.state = "closed";
          };

          $scope.maximize = function(){
            if($scope.options.state == "maximized"){
              $scope.options.oldState = "maximized";
              $scope.options.state = "default"
              $rootScope.$emit("winzmax", [$scope.options.name]);
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

          $document.on("dragover", function(event){
            $scope.endMouseX = event.clientX;
            $scope.endMouseY = event.clientY;
          })
        },
        link: function(scope, el, attrs, controller){

          el.bind("dragstart", function(event){
            var position = {
              x: event.x,
              y: event.y
            };
            scope.oldPosition = position;
            event.dataTransfer.setData("dragdroppos",JSON.stringify(position));
          });

          /*
            It is important to find the difference between old and new position BECAUSE if you select the div in the middle.
            x,y and corresponding clentX, pageX will similarly reference that point you clicked -NOT the start of the div/directive
          */
          el.bind("dragend", function(event){

            scope.options.position = scope.options.position || {};
            var oldPosition = scope.oldPosition;
            var elementDimensions = event.target.getBoundingClientRect();
            //console.log("calculate x:"+scope.endMouseX+" - ("+oldPosition.x+"- "+elementDimensions.left+" ) ");
            //console.log("calculate y:"+scope.endMouseX+" - ("+oldPosition.y+"- "+elementDimensions.top+" ) ");
            scope.options.position.x = scope.endMouseX - (oldPosition.x - elementDimensions.left);
            scope.options.position.y = scope.endMouseY - (oldPosition.y - elementDimensions.top);

            scope.$apply()
          });
        },
        restrict: "E",
        transclude: true,
        template : require("./win95Markup.html")
    };
}

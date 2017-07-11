module.exports = function(){
  return {
    scope: {
      "programs":"=",
      "options": "="
    },
    controller: function($scope){
      $scope.restore = function restore(index){
        console.log(index)
        $scope.programs[index].state = $scope.programs[index].oldState || "default";
      }

      $scope.filterItemIsMinimized = function filterOutClosedAndNotMinimized(item){
        return item.state == "minimized";
      }
    },
    restrict: "E",
    transclude: false,
    template : require("./win95queueMarkup.html")

  };
};

//update readme
//if no programs[i].minimized=true exist, do not show startbar.

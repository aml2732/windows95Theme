module.exports = function(){
  return {
    scope: {
      "programs":"=",
      "options": "="
    },
    controller: function($scope){
      $scope.restore = function restore(index){
        console.log(index)
        $scope.programs[index].minimized = false;
      }

      $scope.filterItemIsMinimized = function filterOutClosedAndNotMinimized(item){
        return item.minimized;
      }
    },
    restrict: "E",
    transclude: false,
    template : require("./win95queueMarkup.html")

  };
};

//update readme
//if no programs[i].minimized=true exist, do not show startbar.

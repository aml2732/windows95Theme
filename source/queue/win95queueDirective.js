module.exports = function(){
  return {
    scope: {
      "programs":"=",
      "options": "="
    },
    controller: function($scope, $rootScope){
      $scope.options = $scope.options || {};
      $scope.restore = function restore(index){
        $scope.programs[index].state = $scope.programs[index].oldState || "default";
        setNewTopZIndex($scope.programs[index].name)
      }

      $scope.filterItemIsMinimized = function filterOutClosedAndNotMinimized(item){
        return item.state == "minimized";
      }


      function setNewTopZIndex(name){
        var sortedProgramsByZIndex = $scope.programs.sort(function(a,b){
          a.zindex = a.zindex || 0; b.zindex = b.zindex || 0;
          return b.zindex>a.zindex;
        });

        var max_z = sortedProgramsByZIndex[0].zindex || 0;
        $scope.programs.forEach(function(currentValue, index, arr){
          if(currentValue.name == name && currentValue.zindex != max_z){
            currentValue.zindex = max_z + 1;
            $scope.options.zindex = max_z +2;
            if (!currentValue.position){
              currentValue.position={}
            }
            return;
          }
        })
      }

      $rootScope.$on("winzmax", function(event, arg){
        setNewTopZIndex(arg[0]);
      });

    },
    restrict: "E",
    transclude: false,
    template : require("./win95queueMarkup.html")

  };
};

//update readme
//if no programs[i].minimized=true exist, do not show startbar.

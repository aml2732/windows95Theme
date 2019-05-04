/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var explorer = __webpack_require__(1);
var queue = __webpack_require__(2);
//var alert = require("./win95AlertDirective.js")


module.exports = {
  explorer: explorer,
  queue: queue
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
        template : __webpack_require__(3)
    };
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
    template : __webpack_require__(4)

  };
};

//update readme
//if no programs[i].minimized=true exist, do not show startbar.


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div class=\"win-container\"\r\n     draggable=\"true\"\r\n     ng-hide=\"options.state == 'closed' || options.state == 'minimized'\"\r\n     style=\"{{options.size&&options.size.width&&options.state!='maximized' ? ('width:' + options.size.width + '; flex-grow:0;') : ''}}\r\n            {{options.size&&options.size.height&&options.state!='maximized' ? ('height:' + options.size.height + ';') : ''}}\r\n            {{options.position&&options.position.x ? ('left:'+options.position.x + 'px;'): ''}}\r\n            {{options.position&&options.position.y ? ('top:'+options.position.y +'px;') : ''}}\r\n            {{options.zindex ? ('z-index:'+options.zindex+';') : ''}}\"\r\n    ng-class=\"{'fullscreen': options.state=='maximized', 'absolute': options.position}\"\r\n    ng-click=\"selectWindow()\">\r\n  <div class=\"win-header-bar\">\r\n    <div class=\"win-header-title\">{{options.name}}</div>\r\n    <div class=\"win-button-group\">\r\n      <span class=\"win-button win-minimize\" ng-click=\"minimize()\">\r\n        <svg width=\"15\" height=\"15\" viewBox=\"0 0 15 15\">\r\n          <line x1=\"3\" y1=\"12\" x2=\"12\" y2=\"12\" stroke=\"black\" stroke-width=\"3\"/>\r\n        </svg>\r\n      </span>\r\n      <span class=\"win-button win-maximize\" ng-click=\"maximize()\">\r\n        <svg width=\"15\" height=\"15\" viewBox=\"0 0 15 15\">\r\n          <line x1=\"2\" y1=\"3\" x2=\"13\" y2=\"3\" stroke=\"black\" stroke-width=\"3\" />\r\n          <rect width=\"9\" height=\"9\" x=\"3\" y=\"3\" stroke=\"black\" stroke-width=\"2\" fill=\"none\"/>\r\n        </svg>\r\n      </span>\r\n      <span class=\"win-button win-close\" ng-click=\"close()\">\r\n        <svg width=\"15\" height=\"15\" viewBox=\"0 0 15 15\">\r\n          <line x1=\"3\" y1=\"3\" x2=\"12\" y2=\"12\" stroke=\"black\" stroke-width=\"2\" />\r\n          <line x1=\"3\" y1=\"12\" x2=\"12\" y2=\"3\" stroke=\"black\" stroke-width=\"2\" />\r\n        </svg>\r\n      </span>\r\n    </div>\r\n  </div>\r\n  <div class=\"win-content\">\r\n    <div class=\"win-inner-content\"\r\n    ng-class=\"{\r\n      'overflow-scroll':options.overflow&&options.overflow=='scroll',\r\n      'overflow-auto': options.overflow&&options.overflow=='auto',\r\n      'overflow-hidden': options.overflow&&options.overflow=='hidden',\r\n      'overflow-y-scroll': options.overflow&&options.overflow=='y-scroll',\r\n      'overflow-x-scroll': options.overflow&&options.overflow=='x-scroll'\r\n    }\"\r\n    ng-transclude></div>\r\n  </div>\r\n  <div class=\"win-footer\"></div>\r\n</div>\r\n";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"queue-container absolute\" style=\"{{options.zindex ? ('z-index:'+options.zindex+';') : ''}}\">\r\n  <div ng-repeat=\"window in programs track by $index\" class=\"queue-program\" ng-click=\"restore($index)\" ng-show=\"filterItemIsMinimized(window)\">\r\n    {{window.name}}\r\n  </div>\r\n</div>\r\n";

/***/ })
/******/ ]);
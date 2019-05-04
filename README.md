[Demo](https://aml2732.github.io/windows95Theme/)

[Developing for windows95Theme](https://github.com/aml2732/windows95Theme/blob/master/docs/makingChangesToSrc.md)

[Customizing win95Directive](https://github.com/aml2732/windows95Theme/blob/master/docs/directiveArguments.md)

## Browser Compatibility
![alt chrome supported](https://raw.githubusercontent.com/aml2732/windows95Theme/master/docs/images/chrome.png)
![alt firefox supported](https://raw.githubusercontent.com/aml2732/windows95Theme/master/docs/images/firefox.png)

## Get started.   
Installation of Package:
 * Download this module (TODO more instructions once on Github/npm)
 * `npm install` dependencies . (`npm install --production` to avoid pulling in dev dependencies)

The /dist/ folder contains built and ready-to-go parials.
 * `win95Global.js` sets the global variable `win95`
 * `win95Directive` just returns the directive

### Method 1 : Bundling JS for the client side using a tool like webpack:
 Sample js for nodejs application:
 ```
 var win95Directive = require("windows95Theme/dist/win95Theme");
 var win95Explorer = win95Theme.explorer;
 var startQueue = win95Theme.queue;

 var programs = [{name: "Test1"},{name: "Test2"}];

 var app = angular.module("myApp", []);
 app.directive("win95theme", win95Explorer);
 app.directive("startqueue", startQueue);

 app.controller("testcontentcontroller", ['$scope', function($scope) {
   $scope.data1 = programs[0];
   $scope.data2 = programs[1];
 }]);

 app.controller("testqueuecontroller", ['$scope', function($scope){
   $scope.programs = programs;
 }]);

 ```
 Sample html:
 ```
 <html>
 <head>
   <link rel="stylesheet" href="./public/win95Style.css">
 </head>
 <body ng-app="myApp" style="background-color: green;" class="computer-container">
   <div class="computer-content" ng-controller="testcontentcontroller">
     <win95theme options="data1">Test 1</win95theme>
     <win95theme options="data2">Test2</win95theme>
   </div>

   <div class="computer-footer" ng-controller="testqueuecontroller">
     <startqueue class="start-queue" programs="programs"></startqueue>
   </div>

   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js" ></script>
   <script src="myAngularApp.js" ></script>
 </body>
 </html>

 ```
 * Where we assume `myAngularApp.js` refers to the bundledjs created by a tool like webpack or browserify

### Method 2 (Not recommended)
 pure html using Global-version mentioned above (assuming the files in dist are mounted on `/`):
 ```
 <html>
 <head>
   <link rel="stylesheet" href="./win95Style.css">
 </head>
 <body>
   <div ng-app="myApp">
     <win95theme options="myoptions"></win95theme>
   </div>
   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js" ></script>
   <script src="./win95Global.js" ></script>
   <script>
     if (win95){
       var app = angular.module("myApp", []);
       app.directive("win95theme", win95);
     }
   </script>
 </body>
 </html>
 ```

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


## Customizing/Developing for this project:  
 If you plan on developing for this Project, get started quick by:  
 * additionally install the test dependencies, if you had not by `npm install`  
 * `cd windows95Theme`  
 * `./node_modules/.bin/webpack --config webpack.config.js` to build outpus to the `dist` folder  
 * If using the testing application, run `node test/test.js`  
 * view at  `http://localhost:3000/test`  

## Directive Arguments:  
 `subject` : The title of your window. IMPORTANT: Note the following format:   
   * If specifying a string inline use the syntax: `subject="'My Title'"`  
   * If specifying a variable name that contains the subject, use the syntax: `subject="myvar"`
   `options` : options is an object containing settings for your usage of the directive. `options="myObj"` where `myObj` is in the form of `{optionName: optionValue}`  

   | Option Name  | Option Value Type | Description |
   | ------------- | ------------- | ------------- |  
   | state | string | Can be either: 'default','maximized', 'minimized', 'closed' |
   | size | object | in the form `{width: value, height: value}` If size is not set, the window will take up as much room as possible. |
   | overflow | string | Either the values `scroll`, `auto`, `hidden`, `y-scroll`, `x-scroll`  |
   | position | object | in the form `{x: value, y: value}` where value is a number and does NOT specify a type like px or percent |


  **states:**  
  closed : directive is hidden from view.  
  maximized: directive overlays max space.  
  minimized : directive is hidden, - and if queue is present, places an associated item in it.  
  default: directive is shown using default sizes; Size can override this behavior.  

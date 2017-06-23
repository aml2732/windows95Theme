## Get started.   
Installation of Package:
 * Download this module (TODO more instructions once on Github/npm)
 * `npm install` dependencies . (`npm install --production` to avoid pulling in dev dependencies)

The /dist/ folder contains built and ready-to-go parials.
 * `win95Global.js` sets the global variable `win95`
 * `win95Directive` just returns the directive

### Method 1
 Sample js for nodejs application:
 ```
 var win95Directive = require("windows95Theme/dist/win95Directive")
 var app = angular.module("myApp", []);
 app.directive("win95theme", win95Directive)
 ```
 Sample html:
 ```
 <div ng-app="myApp">
   <win95theme subject="'My Title'"></win95theme>
 </div>
 ```
### Method 2
 pure html using Global-version mentioned above (assuming the files in dist are mounted on `/`):
 ```
 <html>
 <head>
   <link rel="stylesheet" href="./win95Style.css">
 </head>
 <body>
   <div ng-app="myApp">
     <win95theme></win95theme>
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
   | closed  | boolean | If true: directive is hidden. If false: directive is shown |

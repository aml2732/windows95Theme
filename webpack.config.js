var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path")

//win95Global creates a script-bundle which sets the global win95 = directive function
//win95Directive creates a script-bundle which is just the module.exports = directiveFunction
//HTML loader is needed to import HTML template into directive without needing to rely on keeping the /win95Markup.html endpoint
//css file is copied as-is to the dist folder

module.exports = {
    entry: {
      win95Global: "./source/win95Entry",
      win95Theme: "./source/index",
      test_clientWebApplication: "./test/test_clientWebApplication"
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        { test: /\.html$/, loader: "html-loader" }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{ from: 'source/win95Style.css', to: 'win95Style.css' }])
    ]
}

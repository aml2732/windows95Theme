var express = require('express')
var app = express()
var path = require('path');

/*
  The test server does the following:
  If server is up, hitting localhost:3000/ will display Helloworld
  The localhost:3000/test endpoint will load an angular app with one directive, the win95Theme.
*/

app.use('/public', express.static('dist'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/test', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var app = express();


//load environment from .env
// dotenv.config();
// if (!process.env.AUTH_SECRET){
//   console.log('Error: Specify secret in environment');
//   process.exit(0);
// }

var port = process.env.PORT || 8080;

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/dist'));  // set the static files location /client
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(cookieParser());

app.use(function(err, req, res, next){
  console.log(err);
  res.status(500).json(err);
});


app.get('*', function(req, res) {
		res.sendFile(__dirname +'/public/index.html');
});

app.listen(port);
console.log("App Started on port:", port);

module.exports = app;

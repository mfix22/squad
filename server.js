var express        = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

var app = express();
//load environment from .env
dotenv.config();

var port = process.env.PORT || 8080;
var dbTableName = 'mongodb://localhost/squad';

mongoose.connect(dbTableName);

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/client'));  // set the static files location /client
app.use(logger('dev'));


app.use("/event", require('./app/event/eventController.js'));
app.use("/user", require('./app/user/userRoutes'));


app.use(function(err, req, res, next){
  res.status(500).json(err);
});

// app.get('*', function(req, res) {
// 		res.sendFile(__dirname +'/client/index.html');
// });
app.listen(port);
console.log("App Started on port:", port);

module.exports = app;

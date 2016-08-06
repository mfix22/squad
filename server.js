var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var engines = require('consolidate');
var handlebars = require('handlebars');
var cookieParser = require('cookie-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var app = express();


//load environment from .env
// dotenv.config();
// if (!process.env.AUTH_SECRET){
//   console.log('Error: Specify secret in environment');
//   process.exit(0);
// }

var port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/squad");
// mongoose.Promise =  require('q').Promise;

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/dist'));  // set the static files location /client
app.use(express.static(__dirname + '/public')); 
app.use(logger('dev'));
app.use(cookieParser());
// TODO confirm this
app.disable('etag');

// app.engine('html', engines.handlebars);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');


var User = require('./server-app/user/userModel');
var Calendar = require('./server-app/calendar/calendarModel')
var Event = require('./server-app/event/eventModel')


app.use('/', require('./server-app/auth/authController'));
app.use('/api/e', require('./server-app/event/eventController.js'));
app.use('/u', require('./server-app/user/userController'));
app.use('/c', require('./server-app/calendar/calendarController'));

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

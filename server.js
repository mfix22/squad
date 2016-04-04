// server.js

// modules
var express        = require('express');
var app = express();
var mongoose       = require('mongoose');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

// config files
var db= require('./config/db');

// connect to mongoDB
mongoose.connect(db.url);

// set port
var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// set the static files location /client
app.use(express.static(__dirname + '/client')); 

// routes 
require('./app/routes')(app); 

// start app
// startup our app at http://localhost:8080
app.listen(port);               

console.log("It is listening");

// expose app           
exports = module.exports = app; 

app.get('*', function(req, res) {
		res.sendFile(__dirname +'/client/index.html');
});

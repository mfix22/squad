// server.js

// modules
var express        = require('express');
var app = express();
var mongoose       = require('mongoose');
var bodyParser = require('body-parser');
var config= require('./config.json');
var port = process.env.PORT || config.port;

mongoose.connect(config.databaseTableName);

app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/client'));  // set the static files location /client

app.use("/", require('./app/logger/logger.js')); 
// app.use("/event", require('./app/event/eventController.js'));

app.get('*', function(req, res) {
		res.sendFile(__dirname +'/client/index.html');
});
app.listen(port);               
console.log("App Started");



// exports = module.exports = app; 


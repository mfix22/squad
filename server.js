var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost/squad");

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));  // set the static files location /client
app.use(logger('dev'));


app.use("/event", require('./app/event/eventController.js'));





app.get('*', function(req, res) {
		res.sendFile(__dirname +'/public/index.html');
});
app.listen(port);
console.log('Express server listening on port ' + port);
module.exports = app;

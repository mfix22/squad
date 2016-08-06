var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// local

var ViewSchema = new mongoose.Schema({
});


var viewModel = mongoose.model('View', ViewSchema);
module.exports = viewModel;

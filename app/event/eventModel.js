// mongoose
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title        : String,
    location     : {
      long: Number,
      lat: Number,
      address: String,
      city: String,
      state: String,
      country: String,
    },
    startTime    : Date,
    endTime 	 : Date,
    description  : String,
    dateCreated: { type: Date, default: Date.now },
    color: String,
    busy: Boolean
});


var eventModel = mongoose.model('Event', EventSchema);
module.exports = eventModel;

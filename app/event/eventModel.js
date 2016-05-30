// app/models/song.js

// mongoose
var mongoose = require('mongoose');

// for test, will be changed to song
var eventModel = mongoose.model('Event', {
    title        : String,
    location     : {long: Number, lat: Number},
    startTime    : Date,
    endTime 	 : Date,
    description  : String,
    dateCreated: { type: Date, default: Date.now }
    //date_created : some date, need to add this later!!!!
});


module.exports = eventModel;
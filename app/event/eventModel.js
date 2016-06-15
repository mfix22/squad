// app/models/song.js

// mongoose
var mongoose = require('mongoose');

// for test, will be changed to song
var eventSchema = mongoose.Schema({
    title        : String,
    meetingSpots    : [{
        requestedUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedUserName: String,
        status: Number,
        location: {
            long: Number,
            lat: Number
        }
    }],
    startTime    : Date,
    endTime 	 : Date,
    description  : String,
    dateCreated  : { type: Date, default: Date.now },
    attendees    : [{
        id      :   String,
        creator :   Boolean
    }]
    //date_created : some date, need to add this later!!!!
});

eventSchema.statics.getById = function (id, cb) {
  return this.find({ _id: id }, cb);
}







module.exports = Event =  mongoose.model('Event', eventSchema);

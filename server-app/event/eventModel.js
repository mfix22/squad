// mongoose
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    title           : String,
    meetingSpots    : [{
        requestedUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedUserName: String,
        status: Number,
        location: {
            long: Number,
            lat: Number,
            address: String,
            city: String,
            state: String,
            zip: Number,
            country: String
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
});

eventSchema.statics.getById = function (id, cb) {
  return this.find({ _id: id }, cb);
}

module.exports = mongoose.model('Event', eventSchema);

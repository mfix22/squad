// mongoose
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    title           : String,
    meetingSpots    : [{
        requestedUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedUserName: String,
        status: Number,
        locations: {
            long: Number,
            lat: Number,
            address: String,
            city: String,
            state: String,
            zip: Number,
            country: String
        }
    }],
    meetingTimes: [{
      startTime    : Date,
      endTime 	 : Date,
    }],
    description  : String,
    dateCreated  : { type: Date, default: Date.now },
    attendees    : [{
        id      :   String,
        creator :   Boolean
    }],
    // prevent duplicates being created on upload
    google_id : {
      type : String,
      unique : true,
      sparse : true
    }
});

eventSchema.statics.getById = function (id, cb) {
  return this.find({ _id: id }, cb);
}

module.exports = mongoose.model('Event', eventSchema);

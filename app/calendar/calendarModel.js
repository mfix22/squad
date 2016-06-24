var mongoose = require('mongoose');
var _ = require('underscore');
// local
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('../user/userModel');
var Event = require('../event/eventModel');

var CalendarSchema = new mongoose.Schema({
  'title'     : {
    type : String,
    required : true
  },
  'color' : {
    type : String,
    required : true,
    default : "#c7254e"
  },
  'defaultVisibility' : {
    type : String,
    enum : ['PUBLIC', 'PRIVATE', 'GROUP'],  //TODO check if this is all
    default : 'PUBLIC'
  },
  'dateCreated': {
    type: Date,
    default: Date.now
  },
  'events' : [{
    type : ObjectId,
    ref: 'Event'
  }],
  'sharedUsers' : [{
     'user' : {
       type: ObjectId,
       ref: 'User'
     },
     'canAdd' : {
       type: Boolean,
       default: false
     }
   }]
});

CalendarSchema.methods.addEvent = function(eventId){
  if (_.contains(this.events, eventId)) throw new Error('Duplicate event.');
  else {
    this.events.push(eventId);
    console.log('Event:', eventId, 'added to calendar:', this._id);
    this.save();
  }
};

CalendarSchema.methods.addSharedUser = function(userId){
  if (_.contains(_.pluck(this.sharedUsers, '_id'), userId)) throw new Error('Duplicate shared user.');
  else {
    this.sharedUsers.push(userId);
    console.log('Shared user:', userId, 'added to calendar:', this._id);
  }
};



CalendarSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Calendar', CalendarSchema)

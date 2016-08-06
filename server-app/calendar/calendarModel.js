var mongoose = require('mongoose');
var _ = require('underscore');
var Q = require('q');

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
    enum : ['PUBLIC', 'PRIVATE', 'GROUP', 'FRIENDS'],  //TODO check if this is all
    default : 'FRIENDS'
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
   }],
   // prevent duplicates being created on upload
   'google_id': {
     type : String,
     'index': {
       'unique': true
     }
   }
});

CalendarSchema.methods.import = function(newEvents, cb){
  var _this = this;
  var summary = {
    'newEvents' : [],
    'duplicates' : [],
    'errors' : []
  };
  var promises = [];
  newEvents.forEach((e) => {
    var newE = new Event(e);
    var p = newE.save(function(err, product, numAffected){
      if (!err) {
        _this.addEvent(product._id);
        summary.newEvents.push(product._id);
      }
    }).then(function(val) {
      console.log(val);
    }).catch(function(reason) {
      if (reason.code == 11000){
        var parsed = reason.toJSON();
        console.log(parsed);
        summary.duplicates.push(parsed.op.google_id);
      } else {
        summary.errors.push(reason);
      }
    });
    promises.push(p);
  });
  Q.allSettled(promises).then(function (results){
    _this.save();
    // console.log(results);
    cb({'ok' : true, summary});
  });
};


CalendarSchema.methods.addEvent = function(eventId){
  if (_.contains(this.events, eventId)) throw new Error('Duplicate event.');
  else {
    this.events.push(eventId);
    console.log('Event:', eventId, 'added to calendar:', this._id);
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

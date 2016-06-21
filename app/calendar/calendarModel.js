var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// local
var ObjectId = mongoose.Schema.Types.ObjectId;

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
    enum : ['PUBLIC', 'PRIVATE', 'GROUP'],  //TODO check it this is all
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


var calendarModel = mongoose.model('Calendar', CalendarSchema);
module.exports = calendarModel;

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require('underscore');

// local
var Calendar = require("../calendar/calendarModel");
var ObjectId = mongoose.Schema.Types.ObjectId;
var SALT_WORK_FACTOR = 10;

// TODO add validators for friends[] and calendars[]

var UserSchema = new mongoose.Schema({
  'firstName'    : String,
  'lastName'     : String,
  'username'     : {
    'type' : String,
    //email regex'validate' : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    'required' : true,
    'index': {
      'unique': true
    }
  },
  'password'     : {
    'type' : String,
    'required' : true
  },
  'email' : {
    'type' : String,
    'index' : {
      'unique' : true
    }
  },
  'profileImgURL': String,
  'dateCreated': {
    'type': Date,
    default: Date.now
  },
  'defaultCalendarId' : {
    type: ObjectId,
    ref: 'Calendar',
    // required : true
  },
  'calendars' : [{
    type : ObjectId,
    ref: 'Calendar'
  }],
  'friends' : [{
    type: ObjectId,
     ref: 'User'
   }]
});

UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

UserSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

UserSchema.post('save', function(doc) {
  console.log('Creating New User:', JSON.stringify(doc, null, 4), 'saved.');
});


UserSchema.virtual('profile').get(function(){
  var profile = {
    '_id'       : this._id,
    'lastName'  : this.lastName,
    'firstName' : this.firstName,
    'email'     : this.email,
    'username'  : this.username,
    'profileImgURL' : this.profileImgURL
  }
  return  profile;
});

// UserSchema.virtual('defaultCalendar').get(function(){
//   var user = this;
//   console.log(user.defaultCalendarId);
//   Calendar.findById(user.defaultCalendarId, function(err, cal){
//     if (err) throw err;
//     return cal;
//   });
// });

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

// TODO update this to use callback like above.
UserSchema.methods.addCalendar = function(calendarId){
  // consider using this.calendars = _.uniq(this.calendars)
  if (_.contains(this.calendars, calendarId)) throw new Error('Duplicate calendar.');
  else {
    this.calendars.push(calendarId);
    console.log('Calendar:', calendarId, 'added.');
  }
}

UserSchema.methods.addFriend = function(friendId){
  // consider using this.friends = _.uniq(this.friends)
  if (_.contains(this.friends, friendId)) console.log('Duplicate friend.');
  else {
    this.friends.push(friendId);
    console.log('Friend:', friendId, 'added.');
  }
}

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel;

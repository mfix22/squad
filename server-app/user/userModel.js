var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require('underscore');

// local
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
    },
    'trim' :true
  },
  'password'     : {
    'type' : String,
    'required' : false, //TODO update later for multi-step registration
    'trim' :true
  },
  'email' : {
    'type' : String,
    'index' : {
      'unique' : true
    },
    'trim' :true
  },
  'verifiedEmail' : {
    'type' : Boolean,
    default : false
  },
  'profileImgURL': {
    'type' : String,
    'trim' :true
  },
  'dateCreated': {
    'type': Date,
    default: Date.now
  },
  'defaultCalendar' : {
    type: ObjectId,
    ref: 'Calendar',
    required : true
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
  console.log('User:', JSON.stringify(doc._id, null, 4), 'updated.');
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

UserSchema.virtual('fullName')
  .get(function(){
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(setFullName){
    var split = setFullName.split(' ');
    this.set('firstName', split[0]);
    this.set('lastName', split[1]);
  });

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

UserSchema.methods.addCalendar = function(calendarId){
  // consider using this.calendars = _.uniq(this.calendars)
  if (_.contains(this.calendars, calendarId)) throw new Error('Duplicate calendar.');
  else {
    this.calendars.push(calendarId);
    console.log('Calendar:', calendarId, 'added.');
    console.log(this.calendars);
    this.save();
  }
}

UserSchema.methods.addEvent = function (calendarId, eventId, callback) {
  var Calendar = require("../calendar/calendarModel");
  if (arguments.length !== 2) throw new Error('Invalid Parameters');
  if (this.defaultCalendar == calendarId || _.contains(this.calendars, calendarId)) {
    Calendar.findById(calendarId, function(err, cal) {
      if (err) throw err;
      cal.addEvent(eventId);
      cal.save();
      this.update(); //TODO is this important?
    });
  } else throw new Error("You don't have access to that calendar");
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
// mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var token = require('token');
token.defaults.secret = 'CHANGE-TO-REAL-SECRET-LATER'; //FIXME
token.defaults.timeStep = 30 * 24 * 60 * 60; // 30 days in seconds
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  'firstName'    : String,
  'lastName'     : String,
  'username'        : {
    'type' : String,
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
  'token'        : String,
  'dateCreated': {
    'type': Date,
    default: Date.now
  }
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

UserSchema.virtual('profile').get(function(){
  var profile = {
    'lastName' : this.lastName,
    'firstName' : this.firstName,
    'email'     : this.email,
    'username'  : this.username,
    'profileImgURL' : this.profileImgURL,
    'token' : this.token
  }
  return  profile;
})
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

UserSchema.method('validateToken', function(candidateToken) {
  console.log('username', this.username, 'token', this.token);
  var a = token.verify(this.username, candidateToken);
  if (a)  console.log('******** TOKEN VALID ************');
  return a;
});

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel;

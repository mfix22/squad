var User = require('../app/user/userModel');
var Calendar = require('../app/calendar/calendarModel');
var mongoose = require('mongoose');
var assert = require('assert');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

var defaultCal = new Calendar({'title' : 'Life'});
defaultCal.save();

// create a user a new user
var testUser = new User({
    username: 'test-user',
    password: 'test-password',
    email : 'test-email',
    defaultCalendarId : defaultCal._id
});

Calendar.findById(testUser.defaultCalendarId, function(err, cal){
  console.log(err || JSON.stringify(cal, null, 4));
  assert(cal);
  assert.equal(cal.title, "Life");
  mongoose.connection.close();
});

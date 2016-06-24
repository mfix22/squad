var Event = require('../app/event/eventModel');
var Calendar = require('../app/calendar/calendarModel');
var User = require('../app/user/userModel');
var mongoose = require('mongoose');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


var calendar = new Calendar({
  title: 'TEST'
});
calendar.save();

// create a user a new user
var user = new User({
    username: 'test-user',
    password: 'test-password',
    email : 'test-email',
    defaultCalendarId : calendar._id
});

var event1 = new Event();
event1.save();
var event2 = new Event();
event2.save();

// successful add
user.addEvent(user.defaultCalendarId, event1._id);
user.addEvent(user.defaultCalendarId, event2._id);


user.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('OK');
    User.findByIdAndRemove(user._id, function(err){
      console.log('Connection Closed');
      mongoose.connection.close();
    });
  }
});

var User = require('../app/user/userModel');
var Calendar = require('../app/calendar/calendarModel');
var Event = require('../app/event/eventModel');
var mongoose = require('mongoose');
var assert = require('assert');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// User.findById('576d6e838e70ca702fa6e7b0', function(err, user) {
//   Calendar.findById(user.defaultCalendar , function(err, calendar){
//     var e = new Event();
//     e.save();
//     calendar.addEvent(e._id);
//   })
//   console.log(JSON.stringify(user, null, 4));
// });


User.findById('576d7320dfa098102858242c', '-password')
.populate({
  path : 'defaultCalendar calendars',
  populate: {path : 'events'}
}).exec(function (err, user) {
  if (err) throw err;
  console.log(JSON.stringify(user, null, 4));
});


// var defaultCal = new Calendar({'title' : 'Life'});
// defaultCal.save();
// var e = new Event();
// e.save();
// defaultCal.addEvent(e._id);
// defaultCal.save();
//
// var cal1 = new Calendar({'title' : '1'});
// cal1.save();
//
// var cal2 = new Calendar({'title' : '2'});
// cal1.save();
//
// var cal3 = new Calendar({'title' : '3'});
// cal1.save();
//
// var e1 = new Event();
// e1.save();
// var e2 = new Event();
// e2.save();
// var e3 = new Event();
// e3.save();
//
// cal1.addEvent(e1._id);
// cal2.addEvent(e2._id);
// cal3.addEvent(e3._id);
//
// cal1.save()
// cal2.save();
// cal3.save();
//
//
// // create a user a new user
// var testUser = new User({
//     username: 'Pop',
//     password: 'pop',
//     email : 'test-email',
//     defaultCalendar : defaultCal._id
// });
//
// testUser.addCalendar(cal1._id);
// testUser.addCalendar(cal2._id);
// testUser.addCalendar(cal3._id);
//
// testUser.save();

// mongoose.connection.close

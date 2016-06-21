var User = require('../app/user/userModel');
var Calendar = require('../app/calendar/calendarModel');
var mongoose = require('mongoose');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

console.log(__dirname + "app/calendar/calendarModel");

// create a user a new user
var testUser = new User({
    username: 'test-user',
    password: 'test-password',
    email : 'test-email'
});
console.log(JSON.stringify(testUser, null, 4 ));

var testView1 = new Calendar({});

// successful add
testUser.addCalendar(testView1._id);
console.log(JSON.stringify(testUser, null, 4));

// unsuccessful add
testUser.addCalendar(testView1._id);
console.log(JSON.stringify(testUser, null, 4));

testUser.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('OK');
    Calendar.findOne({_id : testUser.defaultCalendar}, function(calendar){
      console.log("TITLE:", calendar.title);
      User.findByIdAndRemove(testUser._id, function(err){
        console.log('Connection Closed');
        mongoose.connection.close();
      });
    });
  }

});

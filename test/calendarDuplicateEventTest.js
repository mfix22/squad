var Event = require('../app/event/eventModel');
var Calendar = require('../app/calendar/calendarModel');
var mongoose = require('mongoose');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// var defaultCal = new Calendar({'title' : 'Life'});
// defaultCal.save();

var calendar = new Calendar({
    title: 'TEST'
});

console.log(JSON.stringify(calendar, null, 4 ));

var event1 = new Event();

// successful add
calendar.addEvent(event1._id);
console.log(JSON.stringify(calendar, null, 4));

// unsuccessful add
calendar.addEvent(event1._id);
console.log(JSON.stringify(calendar, null, 4));

calendar.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('OK');
    Calendar.findByIdAndRemove(calendar._id, function(err){
      console.log('Connection Closed');
      mongoose.connection.close();
    });
  }
});

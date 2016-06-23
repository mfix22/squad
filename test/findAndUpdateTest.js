var User = require('../app/user/userModel');
var mongoose = require('mongoose');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// var testUser = new User({
//     username: 'test-user',
//     password: 'test-password'
//     // defaultCalendarId : defaultCal._id
// });
// testUser.save();

User.findOneAndUpdate({'username' : 'test-user'}, {'email' : 'mfix@wisc.edu'}, function(err, user){
  if (err) throw err;
  else console.log(user);
});

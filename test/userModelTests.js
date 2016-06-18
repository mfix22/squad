var User = require('../app/user/userModel');
var View = require('../app/view/viewModel');
var mongoose = require('mongoose');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'test-user',
    password: 'test-password',
    email : 'test-email'
});

var testView1 = new View({});

// successful add
testUser.addView(testView1._id);
console.log(JSON.stringify(testUser, null, 4));

// unsuccessful add
testUser.addView(testView1._id);
console.log(JSON.stringify(testUser, null, 4));

User.findByIdAndRemove(testUser._id, function(err){
  mongoose.connection.close();
});

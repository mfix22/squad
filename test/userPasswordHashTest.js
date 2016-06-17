var mongoose = require('mongoose'),
User = require('../app/user/userModel');

var connStr = 'mongodb://localhost/squad-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'test-user',
    password: 'test-password'
});

// save user to database
testUser.save(function(err) {
  if (err) throw err;

  // fetch user and test password verification
  User.findOne({username: 'test-user'}, function(err, user) {
      if (err) {
        mongoose.connection.close();
        throw err;
      }

      // test a matching password
      user.comparePassword('test-password', function(err, isMatch) {
          if (err) {
            mongoose.connection.close();
            throw err;
          }
          console.log('test-password:', isMatch); // -&gt; Password123: true
      });

      // test a failing password
      user.comparePassword('password-test', function(err, isMatch) {
          if (err) {
            mongoose.connection.close();
            throw err;
          }
          console.log('password-test:', isMatch); // -&gt; 123Password: false
          User.findByIdAndRemove(user._id, function(err){
            mongoose.connection.close();
          });
      });


  });
});

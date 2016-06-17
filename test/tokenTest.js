var jwt = require('jsonwebtoken');

var profile = {
  'firstName' : "Mike",
  'lastName'  : "Fix",
  'username'  : "mfix22",
  'email'     : "mfix@wisc.edu",
  'password'  : "test"
}

var token = jwt.sign(profile, "MY SECRET");
console.log(token + "\n");
jwt.verify(token, "MY SECRET", function(err, decoded){
  console.log(decoded);
});

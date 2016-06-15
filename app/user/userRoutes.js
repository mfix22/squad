// node modules
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var token = require('token');

//local packages
var User = require('./userModel');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// ##     ## #### ########  ########  ##       ######## ##      ##    ###    ########  ########
// ###   ###  ##  ##     ## ##     ## ##       ##       ##  ##  ##   ## ##   ##     ## ##
// #### ####  ##  ##     ## ##     ## ##       ##       ##  ##  ##  ##   ##  ##     ## ##
// ## ### ##  ##  ##     ## ##     ## ##       ######   ##  ##  ## ##     ## ########  ######
// ##     ##  ##  ##     ## ##     ## ##       ##       ##  ##  ## ######### ##   ##   ##
// ##     ##  ##  ##     ## ##     ## ##       ##       ##  ##  ## ##     ## ##    ##  ##
// ##     ## #### ########  ########  ######## ########  ###  ###  ##     ## ##     ## ########
router.use("/login", function(req, res, next) {
  if (!req.body.username || !req.body.password){
    res.status(200).send({'err' : 'Invalid parameters'});
  }
  next();
});

router.use('/new', function (req, res, next) {
  if (!req.body.fn || !req.body.ln || !req.body.email || !req.body.password){
    res.status(200).send({ 'err' : 'Invalid parameters'});
  }
  next();
});


// ########   #######  ##     ## ######## ########  ######
// ##     ## ##     ## ##     ##    ##    ##       ##    ##
// ##     ## ##     ## ##     ##    ##    ##       ##
// ########  ##     ## ##     ##    ##    ######    ######
// ##   ##   ##     ## ##     ##    ##    ##             ##
// ##    ##  ##     ## ##     ##    ##    ##       ##    ##
// ##     ##  #######   #######     ##    ########  ######
router.get("/", function(req, res){
  console.log('USER ROOT');

  User.find(function (err, users) {
    if (err) res.status(200).send({"err" : err});
  })
});

router.post('/new', function(req, res){
  console.log('Creating New User');
  var newUser = new User({
    'firstName' : req.body.fn,
    'lastName'  : req.body.ln,
    'email'     : req.body.email,
    'password'  : req.body.password
  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
      //TODO return gentle message
      res.status(500).send({'err' : err});
    } else {
      console.log('User:', JSON.stringify(newUser, null, 4), 'saved.');
      res.status(200).json(newUser);
    }
  });
});

router.post('/login', function(req, res){
  console.log('User Login');
  var userToken = token.generate(req.body.email)
  User.findOneAndUpdate({'email' : req.body.email, 'password' : req.body.password}, {'token' : userToken}, function(err, doc){
    if (err) res.status(500).send({'err' : err});
    res.send(doc);
  });
});

router.get('/:id', function(req, res){
  User.find({'_id' : req.params.id}, function(err, users){
    if (err) {
      res.status(500).send({'err' : err.message});
    } else if (!users.length) {
      res.status(200).send({'err' : 'User does not exist'});
    }
    res.send(users);
  });

});

module.exports = router;


// app.param('user', function(req, res, next, id) {
//
//   // try to get the user details from the User model and attach it to the request object
//   User.find(id, function(err, user) {
//     if (err) {
//       next(err);
//     } else if (user) {
//       req.user = user;
//       next();
//     } else {
//       next(new Error('failed to load user'));
//     }
//   });
// });

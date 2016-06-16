// node modules
var express = require('express');
var bodyParser = require('body-parser');
var token = require('token');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

//local packages
var User = require('./userModel');

token.defaults.secret = 'CHANGE-TO-REAL-SECRET-LATER'; //FIXME
token.defaults.timeStep = 30 * 24 * 60 * 60; // 30 days in seconds

// router config
var router = express.Router();
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use(session({
    secret:'CHANGE-TO-REAL-SECRET-LATER',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day expiration
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      'url' : 'mongodb://localhost/sessions',
      'ttl' : 30 * 24 * 60 * 60, // 30 days
    })
}));

// ##     ## #### ########  ########  ##       ######## ##      ##    ###    ########  ########
// ###   ###  ##  ##     ## ##     ## ##       ##       ##  ##  ##   ## ##   ##     ## ##
// #### ####  ##  ##     ## ##     ## ##       ##       ##  ##  ##  ##   ##  ##     ## ##
// ## ### ##  ##  ##     ## ##     ## ##       ######   ##  ##  ## ##     ## ########  ######
// ##     ##  ##  ##     ## ##     ## ##       ##       ##  ##  ## ######### ##   ##   ##
// ##     ##  ##  ##     ## ##     ## ##       ##       ##  ##  ## ##     ## ##    ##  ##
// ##     ## #### ########  ########  ######## ########  ###  ###  ##     ## ##     ## ########
router.use(function(req,res,next){
  req.squad = {};
  next()
});

function validateLoginParams(req, res, next) {
  if (!req.body.username || !req.body.password){
    res.status(200).send({'err' : 'Invalid parameters'});
  }
  else next();
};

function authenticate(req, res, next){
  User.findOne({'username' : req.body.username}, function(err, user){
    if (!user) {
      // return next(new Error('Cannot find user'));
      res.send('We have no record with that email address.')
    } else{
      user.comparePassword(req.body.password, function(err, isMatch){
        if (err) return next(err);
        else if (isMatch) {
          // req.session.regenerate(function(){
          //   req.session.user = user;
          //   next();
          // });
          var newToken = token.generate(user.username);
          console.log('New Token', newToken);
          user.token = newToken;
          user.save(function (err) {
            if (err) {
              console.log(err);
              //TODO return gentle message
              res.status(500).send({'err' : err});
            }
          });
          req.squad.token = newToken;
          next();
        } else {
          res.send('Invalid Password');
        }
      });
    }
  });
};

function validateUserReqs(req, res, next) {
  if (!req.body.fn || !req.body.ln || !req.body.username || !req.body.password){
    res.status(200).send({ 'err' : 'Invalid parameters'});
  }
  else next();
};

function restrictAccess(req, res, next) {
  // console.log(JSON.stringify(req.session, null, 4));
  if (req.body.token) {
    console.log("Q=" + req.body.token)
    User.findById(req.params.id, function(err, user){
      // console.log(JSON.stringify(user, null, 4));
      if (err) res.status(404).send({'err' : err});
      else if (!user) res.status(404).send({'err' : 'No user with that token.'});
      else if (user.validateToken(req.body.token)){
        req.squad.user = user;
        next();
      } else res.status(404).send({'err' : 'Incorrect token.'});
    });
  } else {
    console.log('User is not logged in');
    res.send({'err' : 'No token provided.'})
  }
};

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

router.post('/new', validateUserReqs, function(req, res){
  console.log('Creating New User');
  console.log(req.body);
  var newUser = new User({
    'firstName' : req.body.fn,
    'lastName'  : req.body.ln,
    'username'  : req.body.username,
    'email'     : req.body.username,
    'password'  : req.body.password,
    'token'     : token.generate(req.body.username)
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

router.post('/login', [validateLoginParams, authenticate], function(req, res){
  res.send({
    'ok' : true,
    'token' : req.squad.token
  });
});

router.post('/:id', restrictAccess, function(req, res){
  if (!req.squad.user) res.send(new Error());
  else res.send(req.squad.user);
});

router.get('/logout', function (req, res) {
  // delete req.session.user;

  res.redirect('/login');
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

// node modules
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

//local packages
var User = require('./userModel');
var email = require('../util/email');
var Calendar = require('../calendar/calendarModel')

// router config
var router = express.Router();
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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


function validateUserReqs(req, res, next) {
  if (!req.body.fn || !req.body.ln || !req.body.username || !req.body.password){ //|| !req.body.email){
    res.status(200).send({ 'err' : 'Invalid parameters'});
  }
  else next();
};

//for /login
function authenticate(req, res, next){
    User.findOne({'username' : req.body.username})
    .populate({
      path : 'defaultCalendar calendars',
      populate: {path : 'events'}
    }).exec(function(err, user){
    if (err) console.log(err);
    else if (!user) {
      console.log("HERE");
      res.json({ err : 'We have no record of ' + req.body.username});
    } else if (!Boolean(user.verifiedEmail)){
      console.log(user.email + " has not been registered yet.");
      res.json({ err : 'This email has not been registered yet'});
    } else{
      console.log(JSON.stringify(user, null, 4));
      user.comparePassword(req.body.password, function(err, isMatch){
        if (err) return next(err);
        else if (isMatch) {
          var newToken = jwt.sign(user.profile, process.env.AUTH_SECRET);
          console.log('New Token', newToken);
          // pass token for cookieing or not
          req.squad.token = newToken;
          // pass user
          req.squad.user = user;
          // strip password from response
          req.squad.user.password = undefined;
          next();
        } else {
          res.send({'err' : 'Invalid Password'});
        }
      });
    }
  });
};

function restrictAccess(req, res, next) {
  var token =  req.body.token || req.cookies.squad || req.params.token || req.headers['x-access-token']; // || req.query.token
  if (token) {
    console.log("Q=" + token + '\n');
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded){
      if (err) {
        console.log("**************" + err);
        next(err);
      } else {
        console.log('Decoded:', decoded);
        req.squad.decoded = decoded;
        return next();
      }
    });
  } else {
    console.log({'err' : 'No token provided.'});
    res.render('login');
  }
};

// ########   #######  ##     ## ######## ########  ######
// ##     ## ##     ## ##     ##    ##    ##       ##    ##
// ##     ## ##     ## ##     ##    ##    ##       ##
// ########  ##     ## ##     ##    ##    ######    ######
// ##   ##   ##     ## ##     ##    ##    ##             ##
// ##    ##  ##     ## ##     ##    ##    ##       ##    ##
// ##     ##  #######   #######     ##    ########  ######

router.post('/register', validateUserReqs, function(req, res){
  console.log(req.body);

  var defCal = new Calendar({'title' : 'Life'});
  defCal.save();

  var newUser = new User({
    'firstName' : req.body.fn,
    'lastName'  : req.body.ln,
    'username'  : req.body.username,
    'password'  : req.body.password,
    'email'     : req.body.username,
    'defaultCalendar' : defCal._id
  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
      //TODO return gentle message
      res.status(400).send({'err' : err});
    } else {
      var token = jwt.sign({
        '_id' : newUser._id,
        'dateCreated' : Date.now
      }, process.env.AUTH_SECRET);

      email.sendToken(newUser.email, token, function(err){
        if (err) res.status(500).send({'err' : "Error sending email to " + newUser.email + "."});
        else {
          res.status(201).send({
            'ok' : true,
            'message' : "Email has been sent to: " + newUser.email
          });
        }
      });
    }
  });
});

router.post('/login', [validateLoginParams, authenticate], function(req, res){
  res.cookie('squad', req.squad.token, {
    maxAge: 30 * 24 * 60  * 60 * 1000, //30 days
    httpOnly: true
  });
  res.status(200).render('homepage', req.squad.user);
  // res.send({
  //   'ok' : true,
  //   'token' : req.squad.token
  // });
});

router.all('/', restrictAccess, function(req, res){
  // console.log('Headers:', JSON.stringify(req.headers, null, 4));
  populateUser(req.squad.decoded._id, function(err, user){
    if (err) res.status(500).send({'err' : err})
    else {
      console.log(JSON.stringify(user, null, 4));
      res.render('homepage', user);
    }
  });
});

router.get('/logout', function (req, res) {
  res.clearCookie('squad');
  res.redirect('/u/');
});

router.get('/register/:token', restrictAccess, function(req, res){
  if (req.squad.decoded._id){
    User.findOneAndUpdate({_id : req.squad.decoded._id}, {'verifiedEmail' : true}, function(err, user){
      console.log(JSON.stringify(user.profile, null, 4));
      var token = jwt.sign(user.profile, process.env.AUTH_SECRET);
      res.cookie('squad', token);
      // TODO fix this, just a hack until we do client side rendering
      req.squad.decoded = user.profile;
      res.redirect('/u/');
    });
  }
});

router.all('/test', function(req, res){
  // console.log("Headers:", JSON.stringify(req.headers, null, 4));
  // console.log('Cookies: ', JSON.stringify(req.cookies, null, 4));

});

 // ####### #     # #     #  #####  ####### ### ####### #     #  #####
 // #       #     # ##    # #     #    #     #  #     # ##    # #     #
 // #       #     # # #   # #          #     #  #     # # #   # #
 // #####   #     # #  #  # #          #     #  #     # #  #  #  #####
 // #       #     # #   # # #          #     #  #     # #   # #       #
 // #       #     # #    ## #     #    #     #  #     # #    ## #     #
 // #        #####  #     #  #####     #    ### ####### #     #  #####
function populateUser(userId, callback) {
  User.findById(userId, '-password')
  .populate({
    path : 'defaultCalendar calendars',
    populate: {path : 'events'}
  }).exec(function (err, user) {
    if (err) {
      callback(err, null);
    }
    callback(null, user);
  });
}

module.exports = router;

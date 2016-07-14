// TODO update middleware to use next(err) and routes to use .get('/', function(err, req, res))

// node modules
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var fs = require('fs-extra');

//local packages
var User = require('./userModel');
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

function restrictAccess(req, res, next) {
  var token =  req.body.token || req.cookies.squad || req.params.token || req.headers['x-access-token']; // || req.query.token
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded){
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        // console.log('Decoded:', decoded);
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    console.log('No token provided.');
    res.redirect('/u/login');
  }
};


// ########   #######  ##     ## ######## ########  ######
// ##     ## ##     ## ##     ##    ##    ##       ##    ##
// ##     ## ##     ## ##     ##    ##    ##       ##
// ########  ##     ## ##     ##    ##    ######    ######
// ##   ##   ##     ## ##     ##    ##    ##             ##
// ##    ##  ##     ## ##     ##    ##    ##       ##    ##
// ##     ##  #######   #######     ##    ########  ######

router.all('/', restrictAccess, function(req, res){
  populateUser(req.decoded._id, function(err, user){
    if (err) res.status(500).send({'err' : err})
    else {
      // console.log(JSON.stringify(user, null, 4));
      res.render('homepage', user);
    }
  });
});

router.all('/login', function(req, res) {
  res.render('login');
});

router.get('/:user_id', restrictAccess, function(req, res) {
    if (req.params.user_id == req.decoded._id){
      populateUser(req.decoded._id, function(err, user){
        if (err) res.status(500).send({'err' : err})
        else {
          console.log(JSON.stringify(user, null, 4));
          res.json(user);
        }
      });
    } else res.status(401).send({'err' : 'You are not authorized to access that user.'});

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
  console.log('UserId:', userId);
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

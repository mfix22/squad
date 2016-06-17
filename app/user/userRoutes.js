// node modules
var express = require('express');
var bodyParser = require('body-parser');

//local packages
var User = require('./userModel');
var controller = require('./userController');


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

//for /login
function authenticate(req, res, next){
  User.findOne({'username' : req.body.username}, function(err, user){
    if (!user) {
      // return next(new Error('Cannot find user'));
      res.send('We have no record with that email address.')
    } else{
      user.comparePassword(req.body.password, function(err, isMatch){
        if (err) return next(err);
        else if (isMatch) {
          var newToken = controller.jwt.sign(user.profile, process.env.AUTH_SECRET);
          console.log('New Token', newToken);
          user.token = newToken;
          req.squad.token = newToken;
          next();
        } else {
          res.send({'err' : 'Invalid Password'});
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
  var token = req.cookies.squad || req.headers['x-access-token'] || req.body.token;
  if (token) {
    console.log("Q=" + token + '\n');
    controller.jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded){
      if (err) {
        console.log("**************" + err);
        next(err);
      } else {
        console.log('Decoded:', decoded);
        res.render('homepage', decoded);
      }
    });
  } else {
    console.log({'err' : 'No token provided.'});
    next();
  }
};

// ########   #######  ##     ## ######## ########  ######
// ##     ## ##     ## ##     ##    ##    ##       ##    ##
// ##     ## ##     ## ##     ##    ##    ##       ##
// ########  ##     ## ##     ##    ##    ######    ######
// ##   ##   ##     ## ##     ##    ##    ##             ##
// ##    ##  ##     ## ##     ##    ##    ##       ##    ##
// ##     ##  #######   #######     ##    ########  ######

router.post('/new', validateUserReqs, function(req, res){
  console.log(req.body);
  var newUser = new User({
    'firstName' : req.body.fn,
    'lastName'  : req.body.ln,
    'username'  : req.body.username,
    'email'     : req.body.username,
    'password'  : req.body.password
  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
      //TODO return gentle message
      res.status(500).send({'err' : err});
    } else {
      var ret = newUser.profile;
      ret.token = controller.jwt.sign(newUser.profile, process.env.AUTH_SECRET);
      res.status(200).json(ret);
    }
  });
});

router.post('/login', [validateLoginParams, authenticate], function(req, res){
  res.cookie('squad', req.squad.token, {
    maxAge: 30 * 24 * 60  * 60 * 1000, //30 days
    httpOnly: true
  });
  res.send({
    'ok' : true,
    'token' : req.squad.token
  });
});

router.all('/', restrictAccess, function(req, res){
  console.log('Headers:', JSON.stringify(req.headers, null, 4));
  return res.render('login');
});

router.get('/logout', function (req, res) {
  console.log('TEST');
  res.clearCookie('squad');
  res.redirect('/u/');
});

router.all('/test', function(req, res){
  // console.log("Headers:", JSON.stringify(req.headers, null, 4));
  // console.log('Cookies: ', JSON.stringify(req.cookies, null, 4));
  res.render('homepage.html', {'username' : 'Mike'});
});

module.exports = router;

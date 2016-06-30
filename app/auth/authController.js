var router = require('express').Router();
var jwt = require('jsonwebtoken');
var request = require('request');

//local packages
var User = require('../user/userModel');
var email = require('../util/email');
var Calendar = require('../calendar/calendarModel')


// #     # ### ######  ######  #       ####### #     #    #    ######  #######
// ##   ##  #  #     # #     # #       #       #  #  #   # #   #     # #
// # # # #  #  #     # #     # #       #       #  #  #  #   #  #     # #
// #  #  #  #  #     # #     # #       #####   #  #  # #     # ######  #####
// #     #  #  #     # #     # #       #       #  #  # ####### #   #   #
// #     #  #  #     # #     # #       #       #  #  # #     # #    #  #
// #     # ### ######  ######  ####### #######  ## ##  #     # #     # #######
router.use(function(req,res,next){
 req.squad = {};
 next()
});

function validateLoginParams(req, res, next) {
 if (!req.body.username || !req.body.password){
   res.status(422).send({'err' : 'Invalid parameters'});
 }
 else next();
};


function validateUserReqs(req, res, next) {
 if (!req.body.fn || !req.body.ln || !req.body.username || !req.body.password){ //|| !req.body.email){
   res.status(422).send({ 'err' : 'Invalid parameters'});
 }
 else next();
};

//for      BASIC /login
function authenticateB(req, res, next){
   User.findOne({'username' : req.body.username})
   .populate({
     path : 'defaultCalendar calendars',
     populate: {path : 'events'}
   }).exec(function(err, user){
   if (err) res.status(500).send({'err' : err})
   else if (!user) {
     res.json({ err : 'We have no record of ' + req.body.username});
   } else if (!Boolean(user.verifiedEmail)){
     console.log(user.email + " has not been registered yet.");
     res.json({ err : 'This email has not been registered yet'});
   } else{
     console.log(JSON.stringify(user, null, 4));
     user.comparePassword(req.body.password, function(err, isMatch){
       if (err) res.status(500).send({'err' : err});
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
         res.status(401).send({'err' : 'Invalid Password'});
       }
     });
   }
 });
};

function authenticateG(req, res, next) {
 var token =  req.body.token || req.params.token || req.headers['x-access-token']; // || req.query.token
 if (token) {
   // var cert = fs.readFileSync('google.pem');  // get public key
   request('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       console.log(body);
       body = JSON.parse(body);
       console.log(body.email);
       User.findOne({'username' : body.email})
       .populate({
         path : 'defaultCalendar calendars',
         populate: {path : 'events'}
       }).exec(function(err, user) {
         if (err) res.status(500).send({'err' : err})
         else if (!user) {
           res.json({ err : 'We have no record of ' + body.email});
         } else {
           // homepage of user
           var newToken = jwt.sign(user.profile, process.env.AUTH_SECRET);
           // pass token for cookieing or not
           req.squad.token = newToken;
           // pass user
           req.squad.user = user;
           // strip password from response
           req.squad.user.password = undefined;
           next();
         }
       });
     } else {
       console.log(error);
       res.status(500).send({'err' : error});
     }
   });
 } else {
   console.log({'err' : 'No token provided.'});
   res.render('login');
 }
};



 // ######  ####### #     # ####### #######  #####
 // #     # #     # #     #    #    #       #     #
 // #     # #     # #     #    #    #       #
 // ######  #     # #     #    #    #####    #####
 // #   #   #     # #     #    #    #             #
 // #    #  #     # #     #    #    #       #     #
 // #     # #######  #####     #    #######  #####
router.post('/login/b', [validateLoginParams, authenticateB], function(req, res){
  res.cookie('squad', req.squad.token, {
    maxAge: 30 * 24 * 60  * 60 * 1000, //30 days
    httpOnly: true
  });
  res.status(200).render('homepage', req.squad.user);
  // w/ client side renderings, just redirect to /

  // res.send({
  //   'ok' : true,
  //   'token' : req.squad.token
  // });
});

router.post('/login/g', authenticateG, function(req, res){
  res.cookie('squad', req.squad.token, {
    maxAge: 30 * 24 * 60  * 60 * 1000, //30 days
    httpOnly: true
  });
  res.status(200).render('homepage', req.squad.user);
});

router.get('/logout', function (req, res) {
  res.clearCookie('squad');
  res.redirect('/u/');
});

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
      res.status(500).send({'err' : err});
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

router.get('/register/:token', function(req, res){
  jwt.verify(req.params.token, process.env.AUTH_SECRET, function(err, decoded){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      User.findOneAndUpdate({_id : decoded._id}, {'verifiedEmail' : true}, function(err, user){
        if (err) res.status(503).send(err);
        else{
          var token = jwt.sign(user.profile, process.env.AUTH_SECRET);
          res.cookie('squad', token);
          // TODO fix this, just a hack until we do client side rendering
          req.decoded = user.profile;
          res.redirect('/u/');
        }
      });
    }
  });
});

module.exports = router;

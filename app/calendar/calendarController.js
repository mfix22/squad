var router = require('express').Router();
var Calendar = require('./calendarModel');
var User = require('../user/userModel');
var Event = require('../event/eventModel');
var jwt = require('jsonwebtoken');

function validateNewCalendarParams(req, res, next) {
  if (!req.body.calendar) res.send({"error": "No calendar"});
  else if (!req.body.calendar.title) res.send({"error": "A calendar title is required."})
  else next();
}

function validateNewEventParams(req, res, next) {
  if (!req.body.event) res.send({"error": "No event"});
  else if (!req.body.event.title) res.send({"error": "An event title is required."})
  else next();
}

function restrictAccess(req, res, next) {
  var token =  req.body.token || req.cookies.squad || req.params.token || req.headers['x-access-token']; // || req.query.token
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded){
      if (err) {
        res.status(500).send(err);
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    console.log({'err' : 'No token provided.'});
    res.render('login');
  }
};


router.get('/', function(req, res) {
    Calendar.find(function(err, calendars) {
        if (err){
            res.send(err);
        }
        else{
            res.json(calendars);
        }
    });
});

router.post('/', [validateNewCalendarParams, restrictAccess], function(req, res) {
    if (!req.decoded) throw new Error('Decoding error.');
    else{
      User.findById(req.decoded._id, '-password').exec(function (err, user) {
        if (err) {
          res.status(500).send({'error' : "Error finding user."})
        } else{
          var calendar = new Calendar({
            'title' : req.body.calendar.title,
            'color' : req.body.calendar.color,
            'defaultVisibility' : req.body.calendar.defaultVisibility
          });
          calendar.save(function(err) {
              if (err)res.send(err);
              else{
                try {
                  user.addCalendar(calendar._id);
                  res.json({ calendar });
                } catch (e) {
                  res.send(e);
                }
              }
          });
        }
      });
    }

});

router.get('/:calendar_id', function(req, res) {
    Calendar.findById(req.params.calendar_id, function (err, calendar) {
        if(err){
            res.send(err);
        }
        else{
            res.json(calendar);
        }
    });
});

router.post('/:calendar_id', [validateNewEventParams, restrictAccess] , function(req, res) {
  console.log(JSON.stringify(req.decoded, null, 4));
  User.findById(req.decoded._id, '-password').exec(function (err, user) {
    if (err) {
      res.status(500).send({'error' : "Error finding user."})
    } else{
      var newE = new Event(req.body.event);
      newE.save();
      try {
        user.addEvent(req.params.calendar_id, newE._id);
        res.send({'ok' : true});
      } catch (e) {
        res.send(e);
      }
    }
  });
  // Calendar.findById(req.params.calendar_id, function (err, calendar) {
  //     if(err){
  //         res.send(err);
  //     }
  //     else{
  //         calendar.addEvent()
  //         res.json(calendar);
  //     }
  // });
});

router.put("/:calendar_id", function(req, res) {
    Calendar.findById(req.params.calendar_id, function(err, calendar) {
        if (err){
            res.send(err);
        }
        else{
            calendar = req.body.calendar;
            if(!calendar){
                res.send({"error": "no calendar"});
            }
            else{
                calendar.save(function(err) {
                    if (err){
                        res.send(err);
                    }
                    else{
                        res.json({ calendar });
                    }
                });
            }
        }
    });
});

router.delete("/:calendar_id", function(req, res) {
    Calendar.remove({_id: req.params.calendar_id}, function(err, bear) {
        if (err){
            res.send(err);
        }
        else{
            res.json({ message: 'Successfully deleted' });
        }
    });
});

module.exports = router;

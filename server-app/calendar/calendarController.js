var router = require('express').Router();
var gcal = require('google-calendar');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var translate = require('../util/translator');
var Calendar = require('./calendarModel');
var User = require('../user/userModel');
var Event = require('../event/eventModel');

 // #     # ### ######  ######  #       ####### #     #    #    ######  #######
 // ##   ##  #  #     # #     # #       #       #  #  #   # #   #     # #
 // # # # #  #  #     # #     # #       #       #  #  #  #   #  #     # #
 // #  #  #  #  #     # #     # #       #####   #  #  # #     # ######  #####
 // #     #  #  #     # #     # #       #       #  #  # ####### #   #   #
 // #     #  #  #     # #     # #       #       #  #  # #     # #    #  #
 // #     # ### ######  ######  ####### #######  ## ##  #     # #     # #######

router.param('calendar_id', function(req,res, next, id) {
  if (isNaN(parseInt(id, 16))) return res.status(400).send({'err' : 'Id is not a valid number'});
  next();
});

function validateNewCalendarParams(req, res, next) {
  if (!req.body.calendar) res.status(400).send({"err": "No calendar provided."});
  else if (!req.body.calendar.title) res.status(400).send({"err": "A calendar title is required."})
  else next();
}

function validateNewEventParams(req, res, next) {
  if (!req.body.event) res.status(400).send({"err": "No event provided."});
  else if (!req.body.event.title) res.status(400).send({"err": "An event title is required."})
  else next();
}

function restrictAccess(req, res, next) {
  var token =  req.body.token || req.cookies.squad || req.params.token || req.headers['x-access-token']; // || req.query.token
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded){
      if (err) {
        res.status(400).send({'err' : err});
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

 // ######  ####### #     # ####### #######  #####
 // #     # #     # #     #    #    #       #     #
 // #     # #     # #     #    #    #       #
 // ######  #     # #     #    #    #####    #####
 // #   #   #     # #     #    #    #             #
 // #    #  #     # #     #    #    #       #     #
 // #     # #######  #####     #    #######  #####

// router.post('/import', function(req, res){
//   var token = req.body.token;
//   if (token){
//     var google_calendar = new gcal.GoogleCalendar(token);
//
//     google_calendar.calendarList.list(function(err, calendarList) {
//       if (err) console.log(err);
//       else {
//         console.log(JSON.stringify(calendarList, null, 4));
//         console.log(calendarList.items[1].id);
//         google_calendar.events.list(calendarList.items[1].id,{
//           timeMin: (new Date()).toISOString(),
//           maxResults: 3,
//           singleEvents: true,
//           orderBy: 'startTime'
//         }, function(err, eventList) {
//           if (err) console.log("***", err);
//           else {
//             console.log(JSON.stringify(eventList, null, 4));
//             fs.writeFile('output.json', eventList.items);
//           }
//         });
//       }
//     });
//     res.status(200).send('ok');
//   } else {
//     res.status(422).send({'err' : 'Import requires an token parameter.'})
//   }
// });

router.get('/g/list', function(req, res){
  var token = req.body.token;
  if (token){
    var google_calendar = new gcal.GoogleCalendar(token);

    google_calendar.calendarList.list(function(err, calendarList) {
      if (err) res.status(400).send({'err' : err});
      else {
        console.log(JSON.stringify(calendarList, null, 4));
        res.status(200).send(calendarList.items);
      }
    });
  } else {
    res.status(422).send({'err' : 'Import requires a token parameter.'})
  }
});

// ! Token required is access_token
router.post('/:calendar_id/import/g', function(req, res){
  var token = req.body.token;
  var googleCalendarId = req.body.calendar_id;
  if (token && googleCalendarId){
    var google_calendar = new gcal.GoogleCalendar(token);
    google_calendar.events.list(googleCalendarId,{
      timeMin: (new Date()).toISOString(),
      //only import X number of years, default=1
      timeMax: moment().add(req.body.numYears || 1, 'y').format(),
      // maxResults: 3,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, eventList) {
      if (err) {
        console.log("***", err);
        res.status(400).send(err);
      } else {
        var newEvents = translate.googleEvents(eventList.items);
        var summary = {
          'newEvents' : [],
          'duplicates' : [],
          'errors' : []
        };
        Calendar.findById(req.params.calendar_id, function (err, calendar) {
            if(err){
              res.status(400).send({'err' : err});
            }
            else{
              calendar.import(newEvents, function(summary) {
                res.send(summary);
              })
            }
        });
      }
    });
  } else {
    res.status(422).send({'err' : 'Import requires access_token and list of calendar ids.'})
  }
});

router.get('/', function(req, res) {
    Calendar.find(function(err, calendars) {
        if (err){
            res.status(400).json(err);
        }
        else{
            res.json(calendars);
        }
    });
});

router.post('/', [validateNewCalendarParams, restrictAccess], function(req, res) {
    if (!req.decoded) res.status(500).send({'err' : 'Decoding error.'});
    else{
      User.findById(req.decoded._id, '-password').exec(function (err, user) {
        if (err) {
          res.status(400).send({'err' : "Error finding user."})
        } else{
          var calendar = new Calendar({
            'title' : req.body.calendar.title,
            'color' : req.body.calendar.color,
            'defaultVisibility' : req.body.calendar.defaultVisibility
          });
          calendar.save(function(err) {
              if (err) res.status(500).send({'err' : err});
              else{
                try {
                  user.addCalendar(calendar._id);
                  res.status(201).json({ "ok" : true, calendar });
                } catch (e) {
                  console.log(e);
                  res.status(500).send({'err' : e});
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
          res.status(400).send({'err' : err});
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
      res.status(400).send({'error' : "Error finding user."})
    } else{
      var newE = new Event(req.body.event);
      newE.save();
      try {
        user.addEvent(req.params.calendar_id, newE._id);
        res.send({'ok' : true,  'event' : newE});
      } catch (e) {
        res.status(500).send(e);
      }
    }
  });
});

router.delete("/:calendar_id", function(req, res) {
    Calendar.remove({_id: req.params.calendar_id}, function(err, bear) {
        if (err){
          res.status(400).send({'err' : err});
        }
        else{
          res.json({ message: 'Successfully deleted' });
        }
    });
});

module.exports = router;

var router = require('express').Router();
var gcal = require('google-calendar');
var jwt = require('jsonwebtoken');
var Q = require('q');

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
function validateNewCalendarParams(req, res, next) {
  if (!req.body.calendar) res.status(504).send({"err": "No calendar provided."});
  else if (!req.body.calendar.title) res.status(504).send({"err": "A calendar title is required."})
  else next();
}

function validateNewEventParams(req, res, next) {
  if (!req.body.event) res.status(505).send({"err": "No event provided."});
  else if (!req.body.event.title) res.status(505).send({"err": "An event title is required."})
  else next();
}

function restrictAccess(req, res, next) {
  var token =  req.body.token || req.cookies.squad || req.params.token || req.headers['x-access-token']; // || req.query.token
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded){
      if (err) {
        res.status(501).send({
          'body' : err,
          'err' : err.message
        });
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
      if (err) res.status(500).send({'err' : err});
      else {
        console.log(JSON.stringify(calendarList, null, 4));
        res.status(200).send(calendarList.items);
      }
    });
  } else {
    res.status(422).send({'err' : 'Import requires a token parameter.'})
  }
});

router.post('/:calendar_id/import/g', function(req, res){
  var token = req.body.token;
  var calendarId = req.body.calendarId;
  if (token && calendarId){
    var google_calendar = new gcal.GoogleCalendar(token);
    google_calendar.events.list(calendarId,{
      timeMin: (new Date()).toISOString(),
      //only import X number of years, default=1
      timeMax: moment().add(req.body.numYears || 1, 'y').format(),
      // maxResults: 3,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, eventList) {
      if (err) {
        console.log("***", err);
        res.status(401).send(err);
      } else {
        var newEvents = translate.googleEvents(eventList.items);
        var summary = {
          'newEvents' : [],
          'duplicates' : [],
          'errors' : []
        };
        var promises = [];
        var count = 0;
        Calendar.findById(req.params.calendar_id, function (err, calendar) {
            if(err){
              res.status(500).send({'err' : err});
            }
            else{
              newEvents.forEach((e) => {
                var newE = new Event(e);
                var p = newE.save(function(err, product, numAffected){
                  if (!err) {
                    calendar.addEvent(product._id);
                    summary.newEvents.push(product._id);
                  }
                }).then(function(val) {
                  console.log(JSON.stringify(val, null, 4));
                }).catch(function(reason) {
                  if (reason.code == 11000){
                    var parsed = reason.toJSON();
                    summary.duplicates.push(parsed.op.google_id);
                  } else {
                    summary.errors.push(reason);
                  }
                });
                promises.push(p);
              });
              Q.allSettled(promises).then(function (results){
                // console.log(results);
                res.status(200).send({
                  'ok' : true,
                  summary
                });
              });
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
            res.status(500).json(err);
        }
        else{
            res.json(calendars);
        }
    });
});

router.post('/', [validateNewCalendarParams, restrictAccess], function(req, res) {
    if (!req.decoded) res.status(501).send({'err' : 'Decoding error.'});
    else{
      User.findById(req.decoded._id, '-password').exec(function (err, user) {
        if (err) {
          res.status(503).send({'err' : "Error finding user."})
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
                  res.json({ "ok" : true, calendar });
                } catch (e) {
                  console.log(e);
                  res.status(504).send({'err' : e});
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
            res.status(500).send({'err' : err});
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
        res.send({'ok' : true,  'event' : newE});
      } catch (e) {
        res.status(505).send(e);
      }
    }
  });
});

router.put("/:calendar_id", function(req, res) {
    Calendar.findById(req.params.calendar_id, function(err, calendar) {
        if (err){
            res.status(504).send({'err' : err});
        }
        else{
            calendar = req.body.calendar;
            if(!calendar){
                res.status(504).send({"err": "No calendar with that id exists."});
            }
            else{
                calendar.save(function(err) {
                    if (err){
                        res.status(504).send({'err' : err});
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
            res.status(504).send({'err' : err});
        }
        else{
            res.json({ message: 'Successfully deleted' });
        }
    });
});

module.exports = router;

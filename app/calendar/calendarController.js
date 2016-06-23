var router = require('express').Router();
var Calendar = require('./calendarModel.js');

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

router.post('/', function(req, res) {
    var calendar = new Calendar(req.body.calendar);
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

var router = require('express').Router();
var Event = require('./eventModel.js');

router.get('/', function(req, res) {
    Event.find(function(err, events) {
        if (err){
            res.send(err);
        }
        else{
            res.json(events);
        }
    });
});

router.post('/', function(req, res) {
    var event = new Event(req.body.event);
    // -----------------------
    // instantiate your object
    // -----------------------
    if(!event){
        res.send({"error": "no event"});
    }
    else{
        event.save(function(err) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ event });
            }
        });
    }

});

router.get('/:event_id', function(req, res) {
    Event.findById(req.params.event_id, function (err, event) {
        if(err){
            res.send(err);
        }
        else{
            res.json(event);
        }
    });
});

router.put("/:event_id", function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
        if (err){
            res.send(err);
        }
        else{
            event = req.body.event;
            if(!event){
                res.send({"error": "no event"});
            }
            else{
                event.save(function(err) {
                    if (err){
                        res.send(err);
                    }
                    else{
                        res.json({ event });
                    }
                });
            }
        }
    });
});

router.delete("/:event_id", function(req, res) {
    Event.remove({_id: req.params.event_id}, function(err, bear) {
        if (err){
            res.send(err);
        }
        else{
            res.json({ message: 'Successfully deleted' });
        }

    });
});

module.exports = router;

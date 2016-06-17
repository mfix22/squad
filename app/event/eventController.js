<<<<<<< HEAD
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

=======
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('GET /event/:id');
  next();
});

// serve angular app files from the '/app' route
router.get('/:id', function(req, res) {
	// console.log(__dirname +'/../client/index.html');
	// res.sendFile(__dirname +'/../client/index.html');
});

>>>>>>> ee95287cd86ebdc33f03810067b218e12c97ad06
module.exports = router;

var router = require('express').Router();
var Event = require('./eventModel.js');


// serve angular app files from the '/app' route
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


router.post('/', function(req, res) {
    var event = new Event();
    // event.title = req.body.title;
    event.save(function(err) {
        if (err){
            res.send(err);
        }
        else{
            res.json({ event });
        }


    });
});





module.exports = router;

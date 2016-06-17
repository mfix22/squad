var router = require('express').Router();
var Test = require('./{{lower}}Model.js');

router.get('/', function(req, res) {
    Test.find(function(err, {{lower}}s) {
        if (err){
            res.send(err);
        }
        else{
            res.json({{lower}}s);
        }
    });
});

router.post('/', function(req, res) {
    var {{lower}} = new Test(req.body.{{lower}});
    {{lower}} = req.body.{{lower}};
    if(!{{lower}}){
        res.send({"error": "no {{lower}}"});
    }
    else{
        {{lower}}.save(function(err) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ {{lower}} });
            }
        });
    }

});

router.get('/:{{lower}}_id', function(req, res) {
    Test.findById(req.params.{{lower}}_id, function (err, {{lower}}) {
        if(err){
            res.send(err);
        }
        else{
            res.json({{lower}});
        }
    });
});

router.put("/:{{lower}}_id", function(req, res) {
    Test.findById(req.params.{{lower}}_id, function(err, {{lower}}) {
        if (err){
            res.send(err);
        }
        else{
            {{lower}} = req.body.{{lower}};
            if(!{{lower}}){
                res.send({"error": "no {{lower}}"});
            }
            else{
                {{lower}}.save(function(err) {
                    if (err){
                        res.send(err);
                    }
                    else{
                        res.json({ {{lower}} });
                    }
                });
            }       
        }
    });
});

router.delete("/:{{lower}}_id", function(req, res) {
    Test.remove({_id: req.params.{{lower}}_id}, function(err, bear) {
        if (err){
            res.send(err);
        }
        else{
            res.json({ message: 'Successfully deleted' });
        }
    });
});

module.exports = router;

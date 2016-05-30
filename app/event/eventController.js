var express = require('express');
var router = express.Router();
 

router.use("")

// serve angular app files from the '/app' route
router.get('/event/:id', function(req, res) {
	// console.log(__dirname +'/../client/index.html');
	// res.sendFile(__dirname +'/../client/index.html');
});


 



module.exports = router;
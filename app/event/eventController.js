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

module.exports = router;

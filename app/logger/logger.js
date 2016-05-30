

var express = require('express');
var router = express.Router();
var morgan = require('morgan'); 
// routes


router.use(morgan('dev'));



// function myLog(req,res,next){
//     console.log("\nRequest:");
//     console.log("url: " + req.url);
//     console.log("method: " + req.method);
//     console.log("params: " + req.params);
//     next();
// }

module.exports = router;

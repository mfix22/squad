var mkdirp = require('mkdirp');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var fs = require('fs-extra')

if(!argv._[0]){
    console.log("Need to enter a app name")
    return;
}

var newApp = argv._[0];
var lower = newApp.toLowerCase();
var upper = newApp.charAt(0).toUpperCase() + newApp.slice(1).toLowerCase();
var folder = path.join(__dirname, '/../app/'+lower+'/');
var controllerDest = folder+lower+'Controller.js';
var modelDest = folder+lower+'Model.js';


fs.mkdirs(path.join(__dirname,'/../app/'+lower+'/'), function (err) {
  if (err) return console.error(err)
})


function replace(inputFile, outputFile){
    var fs = require('fs')
    fs.readFile(inputFile, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/{{lower}}/g, lower);
      var result = result.replace(/{{upper}}/g, upper);

      fs.writeFile(outputFile, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
}

replace(path.join(__dirname,'/templates/controllerTemplate.txt'), controllerDest);
console.log("Created: "+ controllerDest);
replace(path.join(__dirname, '/templates/modelTemplate.txt'), modelDest);
console.log("Created: "+ modelDest);

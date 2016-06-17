var gulp  = require('gulp');
var gutil = require('gulp-util');
var argv = require('minimist');


// gulp.task('new', function(){
//     var newApp = argv._[0];
//     var lower = newApp.toLowerCase();
//     var upper = newApp.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     var controllerDest = 'testgulp/'+lower+'/'+lower+'Controller.txt';
//     var modelDest = 'testgulp/'+lower+'/'+lower+'Model.txt'
//     gulp.src(['scripts/controllerTemplate.js'])
//         .pipe(replace('{{lower}}', lower))
//         .pipe(replace('{{upper}}', upper))
//         .pipe(gulp.dest(controllerDest)
//         .pipe(gutil("Created: "+controllerDest)));
//     gulp.src(['scripts/modelTemplate.js'])
//         .pipe(replace('{{lower}}', lower))
//         .pipe(replace('{{upper}}', upper))
//         .pipe(gulp.dest(modelDest)
//         .pipe(gutil("Created: "+modelDest)));
// });

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

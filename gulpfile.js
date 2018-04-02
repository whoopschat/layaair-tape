var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var moduleName = 'topspeed';
var outputPath = './dist/';

var packageList = [
  './source/bin/js/' + moduleName + '/box.js',
  './source/bin/js/' + moduleName + '/logger.js',
  './source/bin/js/' + moduleName + '/mqttws31.js',
  './source/bin/js/' + moduleName + '/activity.js',
  './source/bin/js/' + moduleName + '/socket.js',
  './source/bin/js/' + moduleName + '/toast.js'
];

gulp.task('build', function () {
  return gulp.src(packageList)
  .pipe(concat(moduleName + '.js'))
  .pipe(gulp.dest(outputPath))
  .pipe(uglify())
  .pipe(rename(moduleName + '.min.js'))
  .pipe(gulp.dest(outputPath));
});
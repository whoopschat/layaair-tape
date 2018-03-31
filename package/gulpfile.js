var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var srcPath = '../bin/js/';
var outputPath = './build/';

function getFolders(dir) {
  return fs.readdirSync(dir)
  .filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

gulp.task('bundle', function () {
  var folders = getFolders(srcPath);

  var tasks = folders.map(function (folder) {
    return gulp.src(path.join(srcPath, folder, '/*.js'))
    .pipe(concat(folder + '.js'))
    .pipe(gulp.dest(outputPath))
    .pipe(uglify())
    .pipe(rename(folder + '.min.js'))
    .pipe(gulp.dest(outputPath));
  });

  return merge(tasks);
});
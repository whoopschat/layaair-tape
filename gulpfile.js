var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var ts = require("gulp-typescript");

var del = require('del');

var moduleName = 'tape';
var includePath = './source/include/';
var inputJsPath = './source/bin/js/';
var outputPath = './dist/';

gulp.task('build:clean', del.bind(null, [outputPath + '*', inputJsPath + '*']));

gulp.task("build:tsc", function () {
  var tsProject = ts.createProject("./source/tsconfig.json");
  return tsProject.src()
  .pipe(tsProject())
  .js.pipe(gulp.dest(inputJsPath));
});

var packageList = [
  inputJsPath + moduleName + '/display.js',
  inputJsPath + moduleName + '/utils.js',
  inputJsPath + moduleName + '/comps.js',
  inputJsPath + moduleName + '/market.js',
  inputJsPath + moduleName + '/media.js',
  inputJsPath + moduleName + '/navigation.js',
  inputJsPath + moduleName + '/socket.js',
  inputJsPath + moduleName + '/js/**/*.js'
];

gulp.task('build:bundle', function () {

  var bundleTapeJs = gulp.src(packageList)
  .pipe(concat(moduleName + '.js'))
  .pipe(gulp.dest(outputPath))
  .pipe(uglify())
  .pipe(rename(moduleName + '.min.js'))
  .pipe(gulp.dest(outputPath));

  var copyInclude = gulp.src([includePath + "**/*"])
  .pipe(gulp.dest(outputPath));

  var tasks = [
    copyInclude,
    bundleTapeJs
  ];
  return merge(tasks);
});

gulp.task('build',
  gulp.series(
    'build:clean',
    'build:tsc',
    'build:bundle')
);
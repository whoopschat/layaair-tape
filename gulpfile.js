var del = require('del');
var merge = require('merge-stream');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpTypescript = require("gulp-typescript");

var moduleName = 'tape';
var includePath = './source/include/';
var inputJsPath = './source/bin/js/';
var outputPath = './dist/';

gulp.task('task:clean', del.bind(null, [outputPath + '*', inputJsPath + '*']));

gulp.task("task:tsc", function () {
  var tsProject = gulpTypescript.createProject("./source/tsconfig.json");
  return tsProject.src()
  .pipe(tsProject())
  .js.pipe(gulp.dest(inputJsPath));
});

var packageList = [
  inputJsPath + moduleName + '/utils.js',
  inputJsPath + moduleName + '/mini.js',
  inputJsPath + moduleName + '/comps.js',
  inputJsPath + moduleName + '/navigation.js',
  inputJsPath + moduleName + '/media.js',
  inputJsPath + moduleName + '/socket.js',
  inputJsPath + moduleName + '/market.js',
  inputJsPath + moduleName + '/js/**/*.js'
];

gulp.task('task:bundle', function () {
  var bundleTapeJs = gulp.src(packageList)
  .pipe(gulpConcat(moduleName + '.js'))
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
    'task:clean',
    'task:tsc',
    'task:bundle')
);
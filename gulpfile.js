var del = require('del');
var merge = require('merge-stream');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpTypescript = require("gulp-typescript");

var moduleName = 'tape';
var srcDir = './src/';
var includePath = srcDir + '/include/';
var inputJsPath = srcDir + '/bin/js/';
var typesConfig = srcDir + '/tsconfig.json';
var outputPath = './dist/';

gulp.task('task:clean', del.bind(null, [outputPath + '*', inputJsPath + '*']));

gulp.task("task:tsc", function () {
    var tsProject = gulpTypescript.createProject(typesConfig);
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(inputJsPath));
});

var packageList = [
    inputJsPath + moduleName + '/polyfill/**/*.js',
    inputJsPath + moduleName + '/utils.js',
    inputJsPath + moduleName + '/common.js',
    inputJsPath + moduleName + '/minigame.js',
    inputJsPath + moduleName + '/conch.js',
    inputJsPath + moduleName + '/comps.js',
    inputJsPath + moduleName + '/navigation.js',
    inputJsPath + moduleName + '/media.js',
    inputJsPath + moduleName + '/socket.js',
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
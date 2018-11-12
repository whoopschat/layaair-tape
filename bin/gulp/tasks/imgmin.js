var gulp = require('gulp');
var gulpImagemin = require('gulp-imagemin');

const getRes = (dir) => {
    return [
        dir + '/**/*.png',
        dir + '/**/*.jpg',
        dir + '/**/*.gif',
    ];
}

const imageminTask = (inputPath, outputDir) => {
    return function () {
        return gulp.src(getRes(inputPath))
            .pipe(gulpImagemin({
                progressive: true
            }))
            .pipe(gulp.dest(outputDir));
    }
}

module.exports = {
    imageminTask
}
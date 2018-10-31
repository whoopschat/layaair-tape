var gulp = require('gulp');
var gulpPngquant = require('gulp-pngquant');

const getResourcesPNG = (dir) => {
    return [
        dir + '/**/*.png',
    ];
}

const pngquantTask = (inputPath, outputDir, quality = '65-80') => {
    return function () {
        return gulp.src(getResourcesPNG(inputPath))
            .pipe(gulpPngquant({
                quality
            }))
            .pipe(gulp.dest(outputDir));
    }
}

module.exports = {
    pngquantTask
}
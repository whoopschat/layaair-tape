var gulp = require('gulp');
var gulpPngquant = require('gulp-pngquant');

const getRes = (dir) => {
    return [
        dir + '/**/*.png',
    ];
}

const pngquantTask = (inputPath, outputDir, quality = "65-80") => {
    if (!quality || typeof quality !== 'string') {
        quality = '65-80'
    }
    return function () {
        return gulp.src(getRes(inputPath))
            .pipe(gulpPngquant({ quality }))
            .pipe(gulp.dest(outputDir));
    }
}

module.exports = {
    pngquantTask
}
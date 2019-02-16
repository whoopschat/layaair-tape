const path = require('path');
const gulp = require('gulp');
const gulpCheerio = require('gulp-cheerio');
const FileUtils = require('../utils/file');

const injectionTask = (outputDir, injectionJs, force) => {
    return (done) => {
        let indexHtml = path.join(outputDir, 'index.html');
        if (injectionJs && FileUtils.existsSync(indexHtml) && force) {
            return gulp.src(indexHtml)
                .pipe(gulpCheerio(function ($) {
                    $('head').append('<script src="' + injectionJs + '"></script>');
                }))
                .pipe(gulp.dest(outputDir));
        } else {
            done();
        }
    };
}

module.exports = {
    injectionTask
}
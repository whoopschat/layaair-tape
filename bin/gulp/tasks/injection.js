const path = require('path');
const gulp = require('gulp');
const gulpCheerio = require('gulp-cheerio');
const FileUtils = require('../utils/file');

const injectionTask = (outputDir, injectionJs, append, force) => {
    return (done) => {
        let indexHtml = path.join(outputDir, 'index.html');
        if (injectionJs && FileUtils.existsSync(indexHtml) && force) {
            return gulp.src(indexHtml)
                .pipe(gulpCheerio(function ($) {
                    let jsList = injectionJs.split(',');
                    if (append && append != 'false') {
                        jsList.forEach(js => {
                            $('body').append('<script src="' + js + '"></script>');
                        });
                    } else {
                        jsList.reverse();
                        jsList.forEach(js => {
                            $('body').prepend('<script src="' + js + '"></script>');
                        });
                    }
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
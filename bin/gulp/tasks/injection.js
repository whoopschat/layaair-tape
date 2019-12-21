const path = require('path');
const gulp = require('gulp');
const gulpCheerio = require('gulp-cheerio');
const FileUtils = require('../utils/file');

const injectionTask = (outputDir, injectionJs, appendInjectionJs, force) => {
    return (done) => {
        let indexHtml = path.join(outputDir, 'index.html');
        if ((injectionJs || appendInjectionJs) && FileUtils.existsSync(indexHtml) && force) {
            let pipe = gulp.src(indexHtml);
            if (injectionJs) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    let jsList = injectionJs.split(',');
                    jsList.reverse();
                    jsList.forEach(js => {
                        $('body').prepend('<script src="' + js + '"></script>');
                    });
                }))
            }
            if (appendInjectionJs) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    let jsList = appendInjectionJs.split(',');
                    jsList.forEach(js => {
                        $('body').append('<script src="' + js + '"></script>');
                    });
                }))
            }
            return pipe.pipe(gulp.dest(outputDir));
        } else {
            done();
        }
    };
}

module.exports = {
    injectionTask
}
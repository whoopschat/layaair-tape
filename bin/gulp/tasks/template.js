const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpBase64 = require('gulp-html-img64');
const FileUtils = require('../utils/file');

const checkLock = (dir, lockFile) => {
    return FileUtils.existsSync(dir + '/' + lockFile);
}

const templateTask = (templateDir, outputDir, replaces = [], lockFile = '.lock', imagebase64 = false, force = false) => {
    if (force || !checkLock(outputDir, lockFile)) {
        return function () {
            var task = gulp.src([templateDir + '/**/*']);
            replaces.forEach(replace => {
                if (replace instanceof Array) {
                    task = task.pipe(gulpReplace(...replace));
                }
            });
            if (imagebase64) {
                task = task.pipe(gulp.dest(outputDir));
                task = task.pipe(gulpBase64());
            }
            task = task.pipe(gulp.dest(outputDir));
            return task;
        }
    } else {
        return function (done) {
            done();
        }
    }
}

module.exports = {
    templateTask
}

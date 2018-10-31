const FileUtils = require('../utils/file');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');

const checkLock = (dir, lockFile) => {
    return FileUtils.existsSync(dir + '/' + lockFile);
}

const templateTask = (templateDir, outputDir, replaces = [], lockFile = '.lock', force = false) => {
    if (force || !checkLock(outputDir, lockFile)) {
        return function () {
            var task = gulp.src([templateDir + '/**/*']);
            replaces.forEach(replace => {
                if (replace instanceof Array) {
                    task = task.pipe(gulpReplace(...replace));
                }
            });
            return task.pipe(gulp.dest(outputDir));
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

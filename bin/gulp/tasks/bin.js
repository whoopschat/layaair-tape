const FileUtils = require('../utils/file');
const gulp = require('gulp');

const checkLock = (dir, lockFile) => {
    return FileUtils.existsSync(dir + '/' + lockFile);
}

const testTask = (testDir, outputDir, lockFile = '.lock') => {
    if (!checkLock(outputDir, lockFile)) {
        return function () {
            return gulp.src([testDir + '/**/*']).pipe(gulp.dest(outputDir));
        }
    } else {
        return function (done) {
            done();
        }
    }
}

module.exports = {
    testTask
}

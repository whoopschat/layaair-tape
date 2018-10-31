const FileUtils = require('../utils/file');
const gulp = require('gulp');
const zip = require('gulp-zip');

const zipTask = (output) => {
    return function () {
        FileUtils.deleteFileSync(`${output}/build.zip`);
        return gulp.src(`${output}/**/*`)
            .pipe(zip('build.zip'))
            .pipe(gulp.dest(output));
    }
}

module.exports = {
    zipTask
}

const gulp = require('gulp');
const javascriptObfuscator = require('gulp-javascript-obfuscator');

const obfuscateTask = (dir, jsFile) => {
    return function () {
        return gulp.src(`${dir}/${jsFile}`)
            .pipe(javascriptObfuscator({
                identifierNamesGenerator:'mangled'
            }))
            .pipe(gulp.dest(dir));
    }
}

module.exports = {
    obfuscateTask
}

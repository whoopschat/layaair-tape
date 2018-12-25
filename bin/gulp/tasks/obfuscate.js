const gulp = require('gulp');
const javascriptObfuscator = require('gulp-javascript-obfuscator');

const obfuscateTask = (dir, jsFile) => {
    return function () {
        return gulp.src(`${dir}/${jsFile}`)
            .pipe(javascriptObfuscator({
                compact: true,
                controlFlowFlattening: false,
                deadCodeInjection: false,
                debugProtection: false,
                debugProtectionInterval: false,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'mangled',
                log: false,
                renameGlobals: false,
                rotateStringArray: true,
                selfDefending: true,
                stringArray: true,
                stringArrayEncoding: false,
                stringArrayThreshold: 0.75,
                unicodeEscapeSequence: false
            }))
            .pipe(gulp.dest(dir));
    }
}

module.exports = {
    obfuscateTask
}

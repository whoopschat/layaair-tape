var gulp = require('gulp');

const getResources = (dir) => {
    return [
        // res
        dir + '/**/res/**/*',
        // json
        dir + '/**/*.json',
        // pic & video
        dir + '/**/*.jpg',
        dir + '/**/*.jpeg',
        dir + '/**/*.png',
        dir + '/**/*.ico',
        dir + '/**/*.atlas',
        dir + '/**/*.sk',
        dir + '/**/*.lm',
        dir + '/**/*.ani',
        dir + '/**/*.swf',
        // audio
        dir + '/**/*.mp3',
        dir + '/**/*.wav',
        dir + '/**/*.ogg',
        // unknown
        dir + '/**/*.doc',
        dir + '/**/*.zip',
    ];
}

const resourcesTask = (inputPath, outputDir) => {
    return function () {
        return gulp.src(getResources(inputPath))
            .pipe(gulp.dest(outputDir));
    }
}

module.exports = {
    resourcesTask
}
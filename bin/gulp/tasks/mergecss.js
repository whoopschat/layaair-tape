const HtmlUtils = require('../utils/html');
const FileUtils = require('../utils/file');
const UUID = require('../utils/uuid');

const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpCssmin = require('gulp-minify-css');
const gulpReplace = require('gulp-replace');
const gulpDownloader = require('gulp-downloader');

const remoteFiles = [];

const downloadRemoteCss = (htmlFile, tempDir) => {
    return (done) => {
        var remoteFiles = HtmlUtils.readRemoteFiles({ file: htmlFile, selector: 'link', attribute: 'href', filter: { rel: 'stylesheet' } });
        var downloads = [];
        remoteFiles.forEach(file => {
            let fileName = ".temp/" + UUID.gid();
            remoteFiles.push(tempDir + '/' + fileName);
            downloads.push({
                fileName,
                request: {
                    url: file
                }
            });
        });
        if (downloads.length > 0) {
            return gulpDownloader(downloads)
                .pipe(gulp.dest(tempDir));
        } else {
            done();
        }
    }
}

const mergeCss = (htmlFile, outputDir, cssFile, uglify, replaces = []) => {
    return (done) => {
        var loadFiles = [...remoteFiles];
        loadFiles.push(...HtmlUtils.readLocalFiles({ file: htmlFile, selector: 'link', attribute: 'href', filter: { rel: 'stylesheet' } }));
        if (loadFiles.length > 0) {
            var task = gulp.src(loadFiles);
            task = task.pipe(gulpConcat(cssFile))
            if (uglify) {
                task = task.pipe(gulpCssmin());
            }
            replaces.forEach(replace => {
                if (replace instanceof Array) {
                    task = task.pipe(gulpReplace(...replace));
                }
            });
            return task.pipe(gulp.dest(outputDir));
        } else {
            done();
        }
    }
}

const cleanTemp = (outputDir) => {
    return (done) => {
        FileUtils.deleteFolderSync(outputDir + '/.temp');
        done();
    }
}

const mergeCssTask = (htmlFile, outputDir, cssFile, uglify, replaces) => {
    gulp.task('mergeJs-downloadRemoteCss', downloadRemoteCss(htmlFile, outputDir));
    gulp.task('mergeJs-mergeCss', mergeCss(htmlFile, outputDir, cssFile, uglify, replaces));
    gulp.task('mergeJs-cleanTemp', cleanTemp(outputDir));
    return gulp.series([
        'mergeJs-downloadRemoteCss',
        'mergeJs-mergeCss',
        'mergeJs-cleanTemp'
    ]);
}

module.exports = {
    mergeCssTask
}
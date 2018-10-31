'use strict';
const chalk = require('chalk');
const path = require('path');
const File = require('./utils/file');
const Html = require('./utils/html');
const Empty = require('./tasks/empty');
const Test = require('./tasks/bin');
const Clean = require('./tasks/clean');
const Resources = require('./tasks/resources');
const Pngquant = require('./tasks/pngquant');
const Template = require('./tasks/template');
const Mergejs = require('./tasks/mergejs');
const Zipe = require('./tasks/zip');
const Publish = require('./tasks/publish');

const gulp = require('gulp');
const minimist = require('minimist');
const program = minimist(process.argv.slice(2), []);

if (!program.platform) {
    program.platform = 'h5';
}

if (!program.buildnum) {
    program.buildnum = 0;
}

if (program.env) {
    if (program.env === 'prod' || program.env === 'production') {
        program.env = 'production';
    } else {
        program.env = 'development';
    }
} else {
    program.env = 'development';
}

if (!program.jsfile) {
    program.jsfile = 'code.js';
}

if (!program.index) {
    program.index = 'index.html';
}

const app_version = `${program.version || File.readJson((program.bincwd || '.') + '/package.json').version || '1.0'}.${program.buildnum}`;

if (!program.x) {
    console.log(`build to ... `, chalk.yellow(program.platform));
    console.log(`build version ... `, chalk.yellow(app_version));
    console.log('');
}

if (program.input) {
    program.input = path.join((program.bincwd || '.') + "/" + program.input);
}

if (program.output) {
    program.bin = path.join((program.bincwd || '.') + "/" + program.output + "/bin");
    program.output = path.join((program.bincwd || '.') + "/" + program.output + "/" + program.platform);
}

const replaceList = [
]

const initReplaceList = (htmlFile) => {
    let projectname = program.projectname || Html.readValue({ file: htmlFile, selector: 'title' }, "WXGame");
    let orientation = program.orientation || Html.readValue({ file: htmlFile, selector: 'meta', attribute: 'screenorientation' }, "portrait");
    let app_id = program.appid || Html.readValue({ file: htmlFile, selector: 'meta', attribute: 'appid' }, "touristappid");
    replaceList.push(['${app_id}', app_id]);
    replaceList.push(['"${is_game_tourist}"', app_id === 'touristappid']);
    replaceList.push(['${app_version}', app_version]);
    replaceList.push(['${orientation}', orientation]);
    replaceList.push(['${project_name}', projectname]);
    replaceList.push(['${env}', program.env]);
    replaceList.push(['${codeJs}', program.jsfile]);
}

const begin = () => {
    let platforms = ['h5', 'wechat', 'qq', 'facebook'];
    let checkPlatform = platforms.indexOf(program.platform) >= 0;
    let checkInput = !!program.input;
    let checkOutput = !!program.output;
    let checkIndex = false;
    if (checkPlatform && checkInput && checkOutput) {
        let index = `${program.input}/${program.index}`;
        checkIndex = File.existsSync(index);
        if (checkIndex) {
            initReplaceList(index);
            return true;
        }
    }
    console.log('');
    if (!checkPlatform) {
        console.log(chalk.red('ERROR:invalid parameters [platform]'));
    }
    if (!checkInput) {
        console.log(chalk.red('ERROR:invalid parameters [input]'));
    }
    if (!checkOutput) {
        console.log(chalk.red('ERROR:invalid parameters [output]'));
    }
    if (!checkIndex) {
        console.log(chalk.red('ERROR:invalid parameters [index]'));
    }
    console.log('');
    return false;
}

gulp.task('error', Empty.emptyTask(() => {
    throw new Error('Invalid Parameters');
}));

gulp.task('help', Empty.emptyTask(() => {
    console.log("");
    console.log("");
    console.log("Usage: tape [options]");
    console.log("  --input            input dir");
    console.log("  --output           output dir");
    console.log("  --platform         [Optional] h5 || wechat || facebook def: h5");
    console.log("  --env              [Optional] development || production(prod)");
    console.log("  --index            [Optional] index.html file def: index.html");
    console.log("  --version          [Optional] version code def: read package.json");
    console.log("  --buildnum         [Optional] version build num def: 0");
    console.log("  --jsfile           [Optional] jsfile def: code.js");
    console.log("  --appid            [Optional] app id");
    console.log("  --projectname      [Optional] project name");
    console.log("  --orientation      [Optional] orientation");
    console.log("  --pngquality       [Optional] png quality def: 65-80");
    console.log("  --zip              [Optional] [bool] zip build.zip");
    console.log("  --minpng           [Optional] [bool] use pngquant");
    console.log("  --min              [Optional] [bool] uglify js");
    console.log("  --publish          [Optional] [bool] publish project");
    console.log("  --force            [Optional] [bool] ignore 'platform'-game.lock");
    console.log("  --x                [Optional] show this help");
    console.log("");
    console.log("");
}));

gulp.task('copybin', Test.testTask('./dist/bin', program.bin, 'bin.lock'));

gulp.task('clean', Clean.cleanTask(program.output, `${program.platform}-game.lock`, program.force));

gulp.task('resources', Resources.resourcesTask(program.input, program.output));

gulp.task('pngquant', Pngquant.pngquantTask(program.input, program.output, program.pngquality || '65-80'));

gulp.task('mergejs', Mergejs.mergejsTask(`${program.input}/${program.index}`, program.output, program.jsfile, program.min, replaceList));

gulp.task('template', Template.templateTask(`./tpl/${program.platform}`, program.output, replaceList, `${program.platform}-game.lock`, program.force));

gulp.task('zip', Zipe.zipTask(program.output));

gulp.task('publish', Publish.publishTask(program.platform, program.output, program.env, app_version));

gulp.task('build', function (done) {
    let tasks = [];
    if (program.x) {
        tasks.push('help');
    } else if (!begin()) {
        tasks.push('error');
    } else {
        tasks.push('copybin');
        tasks.push('clean');
        tasks.push('resources');
        if (program.minpng) {
            tasks.push('pngquant');
        }
        tasks.push('mergejs');
        tasks.push('template');
        if (program.zip || program.platform === 'facebook') {
            tasks.push('zip');
        }
        if (program.publish) {
            tasks.push('publish');
        }
    }
    return gulp.series(tasks)((error) => {
        done();
        console.log('');
        if (error) {
            console.log(chalk.red(`build error: ${error.message}`));
        } else {
            console.log(chalk.yellow(`output : ${path.relative(program.bincwd, program.output)}`));
            console.log(chalk.yellow('build complete.\n'));
        }
    });
});
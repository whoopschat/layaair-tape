'use strict';
const chalk = require('chalk');
const path = require('path');
const File = require('./utils/file');
const Html = require('./utils/html');
const Empty = require('./tasks/empty');
const Test = require('./tasks/bin');
const Android = require('./tasks/android');
const Clean = require('./tasks/clean');
const Resources = require('./tasks/resources');
const Pngquant = require('./tasks/pngquant');
const Template = require('./tasks/template');
const Mergejs = require('./tasks/mergejs');
const Zipe = require('./tasks/zip');
const Obfuscate = require('./tasks/obfuscate');
const Injection = require('./tasks/injection');

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

const app_version = `${program.version || File.readJson((program.bincwd || '.') + '/package.json').version || '1.0.0'}`;

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
    program.outputTemp = program.platform == 'android' ? program.output + '/temp' : program.output;
}

const replaceList = [
]

const initReplaceList = (htmlFile) => {
    let projectname = program.projectname || Html.readValue({ file: htmlFile, selector: 'title' }, "Game");
    let orientation = program.orientation || Html.readValue({ file: htmlFile, selector: 'meta', attribute: 'screenorientation' }, "portrait");
    let packagename = program.packagename || Html.readValue({ file: htmlFile, selector: 'meta', attribute: 'packagename' }, "com.tapegame");
    let bg_color = program.bgcolor ? program.bgcolor : "#ffffff";
    replaceList.push(['${app_version}', app_version]);
    replaceList.push(['${bg_color}', bg_color]);
    replaceList.push(['${orientation}', orientation]);
    replaceList.push(['${project_name}', projectname]);
    replaceList.push(['${package_name}', packagename]);
    replaceList.push(['${env}', program.env]);
    replaceList.push(['${codeJs}', program.jsfile]);
}

const begin = () => {
    let platforms = ['h5', 'android'];
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
    console.log("Usage: layaair-tapex [options]");
    console.log("  --input            input dir");
    console.log("  --output           output dir");
    console.log("  --env              [Optional] development(dev) || production(prod)");
    console.log("  --platform         [Optional] h5 || android");
    console.log("  --index            [Optional] index.html file def: index.html");
    console.log("  --version          [Optional] version code def: read package.json");
    console.log("  --buildnum         [Optional] version build num def: 0");
    console.log("  --jsfile           [Optional] jsfile def: code.js");
    console.log("  --appid            [Optional] wechat or baidu app id");
    console.log("  --projectname      [Optional] project name");
    console.log("  --packagename      [Optional] android package name");
    console.log("  --orientation      [Optional] android screen orientation");
    console.log("  --pngquant         [Optional] pngquant quality def:65-80");
    console.log("  --injection        [Optional] injection js file");
    console.log("  --bgcolor          [Optional] h5 body bg color");
    console.log("  --zip              [Optional] [bool] zip build.zip");
    console.log("  --min              [Optional] [bool] uglify js");
    console.log("  --obfuscate        [Optional] [bool] obfuscate code");
    console.log("  --force            [Optional] [bool] ignore .lock file");
    console.log("  --x                [Optional] show this help");
    console.log("");
    console.log("");
}));

gulp.task('clean', Clean.cleanTask(program.output, `${program.platform}-game.lock`, program.force));

gulp.task('copybin', Test.testTask('./tpl/bin', program.bin, 'bin.lock'));

gulp.task('template', Template.templateTask(`./tpl/build/${program.platform}`, program.output, replaceList, `${program.platform}-game.lock`, program.force));

gulp.task('resources', Resources.resourcesTask(program.input, program.outputTemp));

gulp.task('pngquant', Pngquant.pngquantTask(program.input, program.outputTemp, program.pngquant));

gulp.task('mergejs', Mergejs.mergejsTask(`${program.input}/${program.index}`, program.outputTemp, program.jsfile, !program.obfuscate && program.min, replaceList));

gulp.task('obfuscate', Obfuscate.obfuscateTask(program.outputTemp, program.jsfile));

gulp.task('zip', Zipe.zipTask(program.outputTemp));

gulp.task('android', Android.androidTask(program.outputTemp, "http://stand.alone.version/index.html", program.output));

gulp.task('injection', Injection.injectionTask(program.outputTemp, program.injection, program['injection-append'], program.force));

gulp.task('build', function (done) {
    let tasks = [];
    if (program.x) {
        tasks.push('help');
    } else if (!begin()) {
        tasks.push('error');
    } else {
        tasks.push('clean');
        tasks.push('copybin');
        tasks.push('template');
        tasks.push('resources');
        if (program.pngquant) {
            tasks.push('pngquant');
        }
        tasks.push('mergejs');
        if (program.obfuscate) {
            tasks.push('obfuscate');
        }
        if (program.zip) {
            tasks.push('zip');
        }
        if (program.platform === 'android') {
            tasks.push('android');
        }
        if (program.injection) {
            tasks.push('injection');
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
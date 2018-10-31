#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const fs = require("fs");
const exec = require('./gulp/lib/exectools');
const libDir = path.join(__dirname, '/../');

const call = (cwd = '') => {
    console.log(chalk.yellow('start build...\n'));
    process.argv.push('--bincwd', process.cwd());
    let gulpfile = path.join(libDir, './bin/gulp/gulpfile.js');
    let gulpcwd = path.join(libDir);
    let cmd = "node node_modules/gulp/bin/gulp.js --gulpfile " + gulpfile + " --cwd " + gulpcwd + " build " + process.argv.slice(2).join(' ');
    exec.shell(cmd, { cwd });
}

fs.exists(path.join(libDir, "node_modules/gulp/bin/gulp.js"), function (exists) {
    call(exists ? libDir : '');
});







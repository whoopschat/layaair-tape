#!/usr/bin/env node
const fst = require('./utils/fst');
const version = require('../package.json').version;
const chalk = require('chalk');
const path = require('path');
const fs = require("fs");
const exec = require('./gulp/lib/exectools');
const libDir = path.join(__dirname, '/../');
const args = process.argv.slice(2);

function _arg(index, def) {
    let val = def;
    if (args.length > index) {
        val = args[index];
    }
    return val;
}

const call = (cwd = '') => {
    console.log(chalk.yellow('start build...\n'));
    process.argv.push('--bincwd', process.cwd());
    let gulpfile = path.join(libDir, './bin/gulp/gulpfile.js');
    let gulpcwd = path.join(libDir);
    let cmd = "node node_modules/gulp/bin/gulp.js --gulpfile " + gulpfile + " --cwd " + gulpcwd + " build " + process.argv.slice(3).join(' ');
    exec.shell(cmd, { cwd });
}

console.log('');

let _type = _arg(0, 'default');
if (_type == 'build') {
    fs.exists(path.join(libDir, "node_modules/gulp/bin/gulp.js"), function (exists) {
        call(exists ? libDir : '');
    });
} else if (_type == 'create') {
    let tpl = '';
    let dir = `./${_arg(1, '')}`
    let template = path.join(libDir, `./tpl/create`);
    if (!fst.existsSync(template)) {
        console.log(`Failure : template "${tpl}" not found`);
        console.log('');
        return;
    }
    let output = path.join(libDir, dir);
    if (!fst.emptySync(output)) {
        console.log(`Failure : directory "${output}" is not empty, ignore`);
        console.log('');
        return;
    }
    let replaceOpts = {
        '#project-name#': path.basename(libDir) || 'layaair-tape-project',
        '#layaair-tape-version#': version
    }
    fst.copyDirSync(template, output, (item) => {
        let ext = path.extname(item);
        return ext == '.vue' || ext == '.html' || ext == '.js' || ext == '.json' || ext == '.txt' || ext == '.md' || ext == '.less';
    }, (dst) => dst.replace('npmignore', 'gitignore'), replaceOpts);
    console.log(`Success : ${output}`);
    console.log('');
} else {
    console.log('Usage: layaair-tape [options]');
    console.log("       build   -  build layaair project");
    console.log("       create  -  create layaair project");
    console.log('');
    return;
}







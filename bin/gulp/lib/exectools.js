const execSh = require('exec-sh');
const iconv = require('iconv-lite');
const child_process = require('child_process');

function exec(cmd, options, callback, encode = 'utf-8') {
    child_process.exec(cmd, Object.assign(options || {}, { encoding: 'buffer' }), function (error, stdout, stderr) {
        callback && callback(error, iconv.decode(stderr, encode), iconv.decode(stdout, encode));
    });
}

function shell(cmd, options) {
    execSh(cmd, options);
}

module.exports = {
    exec,
    shell,
}
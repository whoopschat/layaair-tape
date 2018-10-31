const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const exec = require('./exectools');

function fetchCli(cb) {
    if (process.platform == 'darwin') {
        cb && cb('/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/bin/cli');
    } else if (process.platform == 'win32') {
        exec.exec('reg query "HKLM\\SOFTWARE\\WOW6432Node\\Tencent\\微信web开发者工具" /ve', null, (_error, _stdout, stderr) => {
            let match = /REG_SZ\s+(\S.+)/.exec(stderr);
            let devtoolsPath = '';
            if (match) {
                devtoolsPath = `${path.join(path.dirname(match[1]))}\\cli.bat`;
            }
            cb && cb(path.join(devtoolsPath));
        }, 'cp936');
    } else {
        cb && cb('--');
    }
}

function upload(ver, src, desc, cb) {
    fetchCli((cli) => {
        if (!fs.existsSync(cli)) {
            console.log('');
            console.log('cannot find installed wechatdevtools', cli);
            console.log('');
            cb && cb();
        } else {
            exec.exec(`"${cli}" -u ${ver}@${src} --upload-desc "${desc}"`, null, (_error, stdout, stderr) => {
                console.log('');
                if (stderr.indexOf('upload success') >= 0) {
                    console.log(`upload success: ${desc}`);
                } else {
                    let match = /body:\s+(\S.+)/.exec(stdout);
                    if (match && match.length > 1) {
                        console.log(chalk.red(`upload fail: ${match[1].replace('\' } }', '').replace('\'', '')}`));
                    } else {
                        console.log(chalk.red(`upload fail: Unknown`));
                    }
                }
                console.log('');
                cb && cb();
            }, 'utf-8');
        }
    });
}

module.exports = {
    upload
}
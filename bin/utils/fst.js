const fs = require('fs');
const path = require('path');
const func = require('./func');

function _folderSync(file) {
    try {
        var sep = path.sep
        var folders = path.dirname(file).split(sep);
        var p = '';
        while (folders.length) {
            p += folders.shift() + sep;
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }
    } catch (error) {
    }
}

function _mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (_mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
    return false;
}

function _listSync(src) {
    let entrysList = [];
    const fetchFile = (file) => {
        if (!fs.existsSync(file)) {
            return;
        }
        let fileStat = fs.statSync(file);
        if (fileStat.isDirectory()) {
            const fileList = fs.readdirSync(file);
            if (!fileList.length) {
                return;
            }
            fileList.forEach(item => {
                fetchFile(path.join(file, `./${item}`))
            })
        } else {
            entrysList.push(path.relative(src, file));
        }
    }
    fetchFile(src);
    return entrysList;
}

function _copySync(src, dst, filter, map, options) {
    _folderSync(dst);
    let content = null;
    if (filter && filter(src)) {
        content = fs.readFileSync(src, 'utf-8');
        Object.keys(options).forEach(key => {
            if (key != options[key]) {
                content = func.stringReplaceAll(content, key, options[key]);
            }
        });
    } else {
        content = fs.readFileSync(src);
    }
    if (map) {
        dst = map(dst);
    }
    fs.writeFileSync(dst, content);
}

function copyDirSync(src, dst, filter, map, options) {
    if (emptySync(src)) {
        return;
    }
    _mkdirsSync(dst);
    _listSync(src).forEach(file => {
        _copySync(path.join(src, file), path.join(dst, file), filter, map, options);
    })
}

function existsSync(file) {
    return fs.existsSync(file);
}

function emptySync(dir) {
    if (!fs.existsSync(dir)) {
        return true;
    }
    let fileStat = fs.statSync(dir);
    if (fileStat.isDirectory()) {
        const fileList = fs.readdirSync(dir);
        if (!fileList.length) {
            return true;
        }
    }
    return false;
}

module.exports = {
    emptySync,
    existsSync,
    copyDirSync,
}
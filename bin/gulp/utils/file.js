const fs = require('fs');
const path = require('path');

function mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
    return false;
}

function createFolderSync(file) {
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

function deleteFileSync(path) {
    try {
        fs.unlinkSync(path);
    } catch (error) {
    }
}

function deleteFolderSync(path) {
    try {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderSync(curPath);
                } else {
                    // delete file
                    deleteFileSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    } catch (error) {
    }
}

function createFileSync(file, content) {
    createFolderSync(file);
    fs.createWriteStream(file);
    fs.writeFileSync(file, content);
}

function existsSync(file) {
    return fs.existsSync(file);
}

function readJson(file) {
    if (existsSync(file)) {
        try {
            return JSON.parse(fs.readFileSync(file));
        } catch (error) {
        }
    }
    return {};
}

module.exports = {
    mkdirsSync,
    createFileSync,
    createFolderSync,
    deleteFolderSync,
    existsSync,
    deleteFileSync,
    readJson,
}
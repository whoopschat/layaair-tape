var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

const find_value = function (html, config, def) {
    let $ = cheerio.load(html);
    let list = $(config.selector).map(function (i, elem) {
        if (!config.attribute) {
            return $(elem).text();
        } else {
            return $(elem).attr(config.attribute);
        }
    }).toArray();
    if (list.length > 0) {
        return list[list.length - 1];
    }
    return def;
};

const find_local_files = function (html, config) {
    let $ = cheerio.load(html);
    return $(config.selector).map(function (i, elem) {
        let flag = true;
        if (config.filter) {
            Object.keys(config.filter).forEach(key => {
                flag = flag && $(elem).attr(key) == config.filter[key]
            });
        }
        if (config.exclude) {
            Object.keys(config.exclude).forEach(key => {
                if ($(elem).has(key)){
                    flag = flag && $(elem).attr(key) != config.exclude[key];
                }
            });
        }
        return flag ? $(elem).attr(config.attribute) : '';
    }).toArray().filter(function (item) {
        return (item !== undefined && item.substring(0, 4) !== 'http' && item.substring(0, 2) !== '//');
    }).map(function (item) {
        let cwd = config.cwd ? config.cwd : path.dirname(config.file);
        return path.join(cwd, item);
    });
};

const find_remote_files = function (html, config) {
    let $ = cheerio.load(html);
    return $(config.selector).map(function (i, elem) {
        let flag = true;
        if (config.filter) {
            Object.keys(config.filter).forEach(key => {
                flag = flag && $(elem).attr(key) == config.filter[key]
            });
        }
        if (config.exclude) {
            Object.keys(config.exclude).forEach(key => {
                if ($(elem).has(key)){
                    flag = flag && $(elem).attr(key) != config.exclude[key];
                }
            });
        }
        return flag ? $(elem).attr(config.attribute) : '';
    }).toArray().filter(function (item) {
        return item.substring(0, 4) === 'http' || item.substring(0, 2) === '//';
    });
};

const readValue = function (config, def = '') {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_value(html, config, def);
};

const readLocalFiles = function (config) {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_local_files(html, config);
};

const readRemoteFiles = function (config) {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_remote_files(html, config);
};

module.exports = {
    readValue, readLocalFiles, readRemoteFiles
}
const path = require('path');
const layadcc = require('layadcc');
const FileUtils = require('../utils/file');

function androidTask(folder, url, appPath) {
    return function (done) {
        let cache_path = "runtime/app/src/main/assets/cache";
        FileUtils.deleteFolderSync(cache_path);
        let res_path = folder;
        if (res_path && res_path != "" && FileUtils.existsSync(res_path)) {
            var outpath = url;
            var index = outpath.indexOf('?');
            if (index > 0) {
                outpath = outpath.substring(0, index);
            }
            index = outpath.lastIndexOf('/');
            if (index > 0) {
                outpath = outpath.substring(0, index);
            }
            outpath = outpath.replace("http://", "");
            outpath = outpath.replace("https://", "");
            outpath = outpath.replace(/:/g, '.');
            outpath = outpath.replace(/\\/g, '_');
            outpath = outpath.replace(/\//g, '_');
            outpath = path.join(cache_path, outpath);
            outpath = path.join(appPath, outpath);
            FileUtils.mkdirsSync(outpath);
            layadcc.gendcc(res_path, outpath, true, false);
        }
        done();
    }
}

module.exports = {
    androidTask
}
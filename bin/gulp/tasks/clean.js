const FileUtils = require('../utils/file');

const checkLock = (dir, lockFile) => {
    return FileUtils.existsSync(dir + '/' + lockFile);
}

const cleanTask = (dir, lockFile = './lock', force = false) => {
    return (done) => {
        if (force || !checkLock(dir, lockFile)) {
            FileUtils.deleteFolderSync(dir);
            done();
        } else {
            done();
        }
    }
}

module.exports = {
    cleanTask
}
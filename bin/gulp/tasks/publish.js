const wxtools = require('../lib/wxtools');

const publishTask = (platform, output, env, version) => {
    if (platform === 'wechat') {
        return function (done) {
            wxtools.upload(version, output, `env:${env} version:${version}`, () => {
                done();
            })
        }
    } else {
        return function (done) {
            done();
        }
    }
}

module.exports = {
    publishTask
}

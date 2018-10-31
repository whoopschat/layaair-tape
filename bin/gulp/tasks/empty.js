const emptyTask = (cb) => {
    return (done) => {
        cb && cb();
        done();
    }
}

module.exports = {
    emptyTask
}
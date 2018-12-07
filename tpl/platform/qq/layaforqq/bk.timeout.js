setTimeout = (callback, timeout) => {
    let obj = {};
    BK.Director.ticker.setTimeout(callback, timeout, obj);
    return obj;
}

setInterval = (callback, timeout) => {
    let obj = {};
    BK.Director.ticker.setInterval(callback, timeout, obj);
    return obj;
}

clearTimeout = (target) => {
    return BK.Director.ticker.removeTimeout(target);
}

clearInterval = (target) => {
    return BK.Director.ticker.removeInterval(target);
}
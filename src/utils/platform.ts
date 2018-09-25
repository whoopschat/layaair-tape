let _debugOn = true;
let _env = '${env}';
let _promises = {};

const isFacebookApp = () => {
    return window.hasOwnProperty("FBInstant");
}

function execFB(func: string, ...options) {
    if (window.hasOwnProperty("FBInstant")) {
        let funcs = func.split('.');
        let instant = window['FBInstant'];
        while (funcs.length > 1) {
            instant = instant[funcs.shift()];
        }
        if (instant && funcs.length == 1) {
            if (instant.hasOwnProperty(funcs[0])) {
                return instant[funcs[0]](...options);
            }
        }
    }
}

const isWechatApp = () => {
    return window.hasOwnProperty("wx");
}

function execWX(func, ...options) {
    if (window.hasOwnProperty("wx")) {
        let funcs = func.split('.');
        let instant = window['wx'];
        while (funcs.length > 1) {
            instant = instant[funcs.shift()];
        }
        if (instant && funcs.length == 1) {
            if (instant.hasOwnProperty(funcs[0])) {
                return instant[funcs[0]](...options);
            }
        }
    }
}

function postMessageToWXOpenDataContext(data) {
    let openDataContext = execWX('getOpenDataContext');
    openDataContext && openDataContext.postMessage && openDataContext.postMessage(data);
}

function getVersion(): string {
    return "${version}";
}

function setDebug(on: boolean) {
    _debugOn = on;
}

function printDebug(message: any, ...options) {
    if (_debugOn) {
        console.log("Tape:", message, ...options);
    }
}

function getEnv() {
    if (_env.indexOf('${') === 0) {
        return 'development';
    }
    return _env;
}

function setEnv(env) {
    _env = env;
}

function isDev() {
    return getEnv() !== 'production';
}

function isProd() {
    return getEnv() === 'production';
}

function promiseTimeout(promise, type = '', timeout = 3000) {
    if (!promise || !promise.then) {
        return Promise.reject();
    }
    return Promise.race([
        new Promise((_, reject) => {
            _promises[promise] = setTimeout(() => {
                delete _promises[promise];
                reject && reject(`${type}:fail timeout ms:${timeout}`);
            }, timeout);
        }),
        new Promise((resolve, _) => {
            promise.then((res) => {
                clearTimeout(_promises[promise]);
                delete _promises[promise];
                resolve && resolve(res);
            });
        })
    ]);
}

export default {
    getVersion,
    isFacebookApp,
    execFB,
    isWechatApp,
    execWX,
    postMessageToWXOpenDataContext,
    setDebug,
    printDebug,
    getEnv,
    setEnv,
    isDev,
    isProd,
    promiseTimeout,
}
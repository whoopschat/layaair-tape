//////////////////////////
/////  Laya
//////////////////////////

const isLayaApp = () => {
    return window.hasOwnProperty("Laya") && !window['Laya'].isMock;
}

const isConchApp = () => {
    return window.hasOwnProperty("conch") && !window['conch'].isMock;
}

//////////////////////////
/////  Browser
//////////////////////////

const isBrowserApp = () => {
    return !isFacebookApp() && !isWechatApp() && !isQQApp();
}

const sendMessageToPlatform = (params, callback) => {
    if (!Laya || !Laya.conchMarket) {
        callback && callback({})
        return;
    }
    Laya.conchMarket.sendMessageToPlatform(JSON.stringify(params || {}), function (json): void {
        callback && callback(JSON.parse(json || '{}'))
    });
}

//////////////////////////
/////  Facebook
//////////////////////////

const isFacebookApp = () => {
    return window.hasOwnProperty("FBInstant") && !window['FBInstant'].isMock;
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


//////////////////////////
/////  QQ
//////////////////////////

const isQQApp = () => {
    return window.hasOwnProperty("BK") && !window['BK'].isMock;
}

function execQQ(func: string, ...options) {
    if (window.hasOwnProperty("BK")) {
        let funcs = func.split('.');
        let instant = window['BK'];
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

//////////////////////////
/////  Wechat
//////////////////////////

const isWechatApp = () => {
    return !isFacebookApp() && !isQQApp() && window.hasOwnProperty("wx") && !window['wx'].isMock;
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

//////////////////////////
/////  Baidu
//////////////////////////

const isBaiduApp = () => {
    return !isFacebookApp() && !isQQApp() && window.hasOwnProperty("swan") && !window['swan'].isMock;
}

function execBD(func, ...options) {
    if (window.hasOwnProperty("swan")) {
        let funcs = func.split('.');
        let instant = window['swan'];
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

function postMessageToBDOpenDataContext(data) {
    let openDataContext = execBD('getOpenDataContext');
    openDataContext && openDataContext.postMessage && openDataContext.postMessage(data);
}

//////////////////////////
/////  Version
//////////////////////////

let _tape_version = "${tape_version}";
let _app_version = '${app_version}';

function getVersion(): string {
    if (_tape_version.indexOf('${') === 0) {
        return '1.0.0';
    }
    return _tape_version;
}

function getAppVersion(): string {
    if (_app_version.indexOf('${') === 0) {
        return '1.0.0';
    }
    return _app_version;
}

//////////////////////////
/////  Debug
//////////////////////////

let _debugOn = true;

function setDebug(on: boolean) {
    _debugOn = on;
}

function printDebug(message: any, ...options) {
    if (_debugOn) {
        console.log("Tape:", message, ...options);
    }
}

function printError(message: any, ...options) {
    if (_debugOn) {
        console.error("Tape:", message, ...options);
    }
}

//////////////////////////
/////  Env
//////////////////////////

let _env = '${env}';

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


//////////////////////////
/////  platform
//////////////////////////

export const FACEBOOK = 'facebook';
export const QQ = 'qq';
export const WECHAT = 'wechat';
export const BAIDU = 'baidu';
export const BROWSER = 'browser';

function getPlatform() {
    if (isFacebookApp()) {
        return FACEBOOK;
    } else if (isQQApp()) {
        return QQ;
    } else if (isWechatApp()) {
        return WECHAT;
    } else if (isBaiduApp()) {
        return BAIDU;
    }
    return BROWSER;
}

export default {
    getAppVersion,
    getVersion,
    isLayaApp,
    isConchApp,
    isBrowserApp,
    sendMessageToPlatform,
    isQQApp,
    execQQ,
    isFacebookApp,
    execFB,
    isWechatApp,
    execWX,
    postMessageToWXOpenDataContext,
    isBaiduApp,
    execBD,
    postMessageToBDOpenDataContext,
    setDebug,
    printError,
    printDebug,
    getEnv,
    setEnv,
    isDev,
    isProd,
    getPlatform,
}
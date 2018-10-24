//////////////////////////
/////  Laya
//////////////////////////

const isLayaApp = () => {
    return window.hasOwnProperty("Laya") && !window['Laya'].isMock;
}

//////////////////////////
/////  Browser
//////////////////////////

const isBrowserApp = () => {
    return !isFacebookApp() && !isWechatApp();
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
/////  Wechat
//////////////////////////

const isWechatApp = () => {
    return window.hasOwnProperty("wx") && !window['wx'].isMock;
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
export const WECHAT = 'wechat';
export const BROWSER = 'browser';

function getPlatform() {
    return isFacebookApp() ? FACEBOOK : (isWechatApp() ? WECHAT : BROWSER);
}

export default {
    getAppVersion,
    getVersion,
    isLayaApp,
    isBrowserApp,
    isFacebookApp,
    execFB,
    isWechatApp,
    execWX,
    postMessageToWXOpenDataContext,
    setDebug,
    printError,
    printDebug,
    getEnv,
    setEnv,
    isDev,
    isProd,
    getPlatform,
}
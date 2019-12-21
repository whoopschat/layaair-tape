//////////////////////////
/////  Env
//////////////////////////

const isLayaApp = () => {
    return window.hasOwnProperty("Laya");
}

const isConchApp = () => {
    return window.hasOwnProperty("conch");
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

function setEnv(env) {
    _env = env;
}

function getEnv() {
    if (_env.indexOf('${') === 0) {
        return 'development';
    }
    return _env;
}

function isDev() {
    return getEnv() !== 'production';
}

function isProd() {
    return getEnv() === 'production';
}

export default {
    isLayaApp,
    isConchApp,
    getAppVersion,
    getVersion,
    setDebug,
    printError,
    printDebug,
    getEnv,
    setEnv,
    isDev,
    isProd
}